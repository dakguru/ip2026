import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';
import { subDays, startOfDay } from 'date-fns';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const daysRequested = parseInt(searchParams.get('days') || '30', 10);
        const today = new Date();
        const startDate = startOfDay(subDays(today, daysRequested));

        const locationAgg = await LoginLog.aggregate([
            { 
                $match: { 
                    loginAt: { $gte: startDate }, 
                    status: 'success',
                    'location.city': { $exists: true, $ne: 'Unknown' }
                } 
            },
            { 
                $group: { 
                    _id: { 
                        city: '$location.city', 
                        region: '$location.region', 
                        country: '$location.country' 
                    }, 
                    count: { $sum: 1 } 
                } 
            },
            { $sort: { count: -1 } },
            { $limit: 15 }
        ]);

        const totalLogins = locationAgg.reduce((acc, curr) => acc + curr.count, 0);

        const locations = locationAgg.map(loc => ({
            city: loc._id.city,
            region: loc._id.region,
            country: loc._id.country,
            count: loc.count,
            percentage: totalLogins > 0 ? ((loc.count / totalLogins) * 100).toFixed(1) : 0
        }));

        return NextResponse.json({ locations });

    } catch (error) {
        console.error('Analytics Locations Error:', error);
        return NextResponse.json({ error: 'Failed to fetch location data' }, { status: 500 });
    }
}
