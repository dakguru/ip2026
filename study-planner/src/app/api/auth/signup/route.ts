import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password, name, mobile, designation, pincode, officeName, division, circle, gender } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await createUser(email, password, name, {
            mobile,
            designation,
            pincode,
            officeName,
            division,
            circle,
            gender
        });

        return NextResponse.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { error: (error as any).message || 'Internal server error' },
            { status: 500 }
        );
    }
}
