
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';
import { subDays, format, startOfDay } from 'date-fns';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const daysRequested = parseInt(searchParams.get('days') || '30', 10);
        const today = new Date();
        const startDate = startOfDay(subDays(today, daysRequested));

        // 1. Daily Login Trends
        const dailyTrendsAgg = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: startDate }, status: 'success' } },
            { $project: { date: { $dateToString: { format: '%Y-%m-%d', date: '$loginAt' } } } },
            { $group: { _id: '$date', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // 2. Hourly Login Distribution
        const hourlyDistributionAgg = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: startDate }, status: 'success' } },
            { $project: { hour: { $hour: '$loginAt' } } },
            { $group: { _id: '$hour', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // 3. Repeat vs New Users
        const firstTimeLoginsAgg = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: startDate }, status: 'success' } },
            { $group: { _id: '$userId', firstLogin: { $min: '$loginAt' } } },
            { $match: { firstLogin: { $gte: startDate } } }
        ]);
        const firstTimeLoginCount = firstTimeLoginsAgg.length;
        
        const totalUniqueLoginsPeriod = await LoginLog.distinct('userId', {
            loginAt: { $gte: startDate },
            status: 'success'
        });
        const returningLoginCount = totalUniqueLoginsPeriod.length - firstTimeLoginCount;

        return NextResponse.json({
            dailyTrends: dailyTrendsAgg,
            hourlyDistribution: hourlyDistributionAgg,
            userTypes: {
                firstTime: firstTimeLoginCount,
                returning: returningLoginCount
            }
        });

    } catch (error) {
        console.error('Analytics Trends Error:', error);
        return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
    }
}
