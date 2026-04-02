
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';
import UserModel from '@/models/User';
import { startOfDay, endOfDay, subDays } from 'date-fns';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const daysParam = parseInt(searchParams.get('days') || '30', 10);

        const today = new Date();
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);
        const sevenDaysAgo = subDays(today, 7);
        const fifteenDaysAgo = subDays(today, 15);
        const thirtyDaysAgo = subDays(today, 30);
        const customDaysAgo = subDays(today, daysParam);

        // 1. Total Logins Today
        const totalLoginsToday = await LoginLog.countDocuments({
            loginAt: { $gte: startOfToday, $lte: endOfToday },
            status: 'success'
        });

        // 2. Unique Users Logged In Today
        const uniqueUsersTodayArr = await LoginLog.distinct('userId', {
            loginAt: { $gte: startOfToday, $lte: endOfToday },
            status: 'success'
        });
        const uniqueUsersToday = uniqueUsersTodayArr.length;

        // 3. Repeat Users Today
        const repeatUsersAgg = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: startOfToday, $lte: endOfToday }, status: 'success' } },
            { $group: { _id: '$userId', count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]);
        const repeatUsersToday = repeatUsersAgg.length;

        // 4. Active Users (Last 7 Days)
        const activeUsers7DaysArr = await LoginLog.distinct('userId', {
            loginAt: { $gte: sevenDaysAgo },
            status: 'success'
        });
        const activeUsers7Days = activeUsers7DaysArr.length;

        // 5. Inactive Users
        const totalUsersCount = await UserModel.countDocuments({ role: 'user' });
        
        const inactive7Days = await UserModel.countDocuments({
            role: 'user',
            $or: [
                { lastActiveAt: { $lt: sevenDaysAgo } },
                { lastActiveAt: { $exists: false } }
            ]
        });

        const inactive15Days = await UserModel.countDocuments({
            role: 'user',
            $or: [
                { lastActiveAt: { $lt: fifteenDaysAgo } },
                { lastActiveAt: { $exists: false } }
            ]
        });

        const inactive30Days = await UserModel.countDocuments({
            role: 'user',
            $or: [
                { lastActiveAt: { $lt: thirtyDaysAgo } },
                { lastActiveAt: { $exists: false } }
            ]
        });

        // 6. Avg Daily Logins (Last X Days)
        const totalLoginsPeriod = await LoginLog.countDocuments({
            loginAt: { $gte: customDaysAgo },
            status: 'success'
        });
        const avgDailyLogins = (totalLoginsPeriod / daysParam).toFixed(1);

        // 7. Peak Login Time (Hour-wise) - Last X days
        const peakHoursAgg = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: customDaysAgo }, status: 'success' } },
            { $project: { hour: { $hour: '$loginAt' } } },
            { $group: { _id: '$hour', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const peakLoginTime = peakHoursAgg.length > 0 ? `${peakHoursAgg[0]._id}:00` : 'N/A';

        return NextResponse.json({
            totalLoginsToday,
            uniqueUsersToday,
            repeatUsersToday,
            activeUsers7Days,
            inactive7Days,
            inactive15Days,
            inactive30Days,
            avgDailyLogins,
            peakLoginTime,
            totalUsersCount
        });

    } catch (error) {
        console.error('Analytics Summary Error:', error);
        return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
    }
}
