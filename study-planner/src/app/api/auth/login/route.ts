import { NextResponse } from 'next/server';
import { verifyUser, updateSessionById } from '@/lib/db';
import LoginLog from '@/models/LoginLog';
import UserModel from '@/models/User';
import dbConnect from '@/lib/mongoose';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { UAParser } from 'ua-parser-js';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();
        const headerList = await headers();
        
        const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || '0.0.0.0';
        const userAgent = headerList.get('user-agent') || '';

        // Extract location from Vercel headers
        const location = {
            city: headerList.get('x-vercel-ip-city') || 'Unknown',
            region: headerList.get('x-vercel-ip-country-region') || 'Unknown',
            country: headerList.get('x-vercel-ip-country') || 'Unknown'
        };
        
        // Advanced Device Fingerprinting
        const appId = headerList.get('x-device-id');
        const appModel = headerList.get('x-device-model');
        
        const parser = new UAParser(userAgent);
        const uaResult = parser.getResult();
        
        const osName = uaResult.os.name || 'Unknown OS';
        const browserName = uaResult.browser.name || 'Unknown Browser';
        const browserMajor = uaResult.browser.major || '';

        let deviceId = appId;
        let clientName = appModel || `${browserName} ${browserMajor}`;
        let deviceType: 'Mobile' | 'Web' = appId ? 'Mobile' : 'Web';
        let os = appId ? (uaResult.os.name || 'Android') : osName;

        if (!deviceId) {
            // Web Fingerprint: Hash of OS + Browser Name + Major Version
            deviceId = crypto.createHash('md5')
                .update(`${osName}-${browserName}-${browserMajor}`)
                .digest('hex');
        }

        const deviceLogInfo = { 
            type: deviceType, 
            os: os, 
            browser: appId ? 'App' : browserName 
        };

        if (!email || !password) {
            await LoginLog.create({
                email: email || 'unknown',
                status: 'failed',
                failureReason: 'Missing credentials',
                ip,
                location,
                device: deviceLogInfo
            });
            return NextResponse.json(
                { error: 'Missing credentials' },
                { status: 400 }
            );
        }

        const user = await verifyUser(email, password);

        if (!user) {
            await LoginLog.create({
                email: email,
                status: 'failed',
                failureReason: 'Invalid email or password',
                ip,
                location,
                device: deviceLogInfo
            });
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate a unique session ID
        const sessionId = crypto.randomUUID();
        await updateSessionById(user.id, sessionId);

        // Log successful login
        await LoginLog.create({
            userId: user.id,
            userName: user.name,
            email: user.email,
            role: user.role,
            membershipLevel: user.membershipLevel,
            status: 'success',
            ip,
            location,
            device: deviceLogInfo,
            sessionId
        });

        // Update User's knownDevices for credential sharing detection
        const deviceData = {
            deviceId,
            deviceType,
            os,
            clientName,
            lastSeen: new Date()
        };

        const existingDevice = await UserModel.findOne({ 
            _id: user.id, 
            'knownDevices.deviceId': deviceId 
        });

        if (existingDevice) {
            await UserModel.updateOne(
                { _id: user.id, 'knownDevices.deviceId': deviceId },
                { $set: { 'knownDevices.$.lastSeen': new Date() } }
            );
        } else {
            await UserModel.updateOne(
                { _id: user.id },
                { $push: { knownDevices: { ...deviceData, firstSeen: new Date() } } }
            );
        }

        // maxAge in seconds (30 days — keep user logged in until they login on another device)
        const maxAge = 60 * 60 * 24 * 30;

        // Create response
        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, courseMode: user.courseMode, role: user.role } });

        // Set cookie - auth_token now holds email and sessionId
        response.cookies.set('auth_token', `${user.email}:${sessionId}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: maxAge,
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        });

        response.cookies.set('user_session', JSON.stringify({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            membershipLevel: user.membershipLevel,
            courseMode: user.courseMode,
            planId: user.planId,
            planName: user.planName,
            sessionId: sessionId
        }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: maxAge,
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
