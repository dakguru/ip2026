
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import UserModel from '@/models/User';
import LoginLog from '@/models/LoginLog';
import { differenceInDays, subDays } from 'date-fns';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const membership = searchParams.get('membership');
        const role = searchParams.get('role');
        const activity = searchParams.get('activity');
        const skip = (page - 1) * limit;

        const baseMatch: any = { role: role || { $ne: 'admin' } };
        if (membership) baseMatch.membershipLevel = membership;

        // Perform main user aggregation
        const userStatsAgg = await UserModel.aggregate([
            { $match: baseMatch },
            {
                $lookup: {
                    from: 'loginlogs',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'logins'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    mobile: 1,
                    role: 1,
                    membershipLevel: 1,
                    lastActiveAt: 1,
                    createdAt: 1,
                    totalLogins: { $size: '$logins' },
                    lastPlatform: 1,
                    // Most used device
                    deviceType: {
                        $arrayElemAt: [
                            {
                                $map: {
                                    input: { $slice: ['$logins.device.type', -1] }, // This is a placeholder, real freq needs more agg
                                    as: 'd',
                                    in: '$$d'
                                }
                            },
                            0
                        ]
                    }
                }
            },
            { $sort: { lastActiveAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        const totalUsers = await UserModel.countDocuments(baseMatch);
        const today = new Date();

        const transformedUsers = userStatsAgg.map(user => {
            const daysSinceLogin = user.lastActiveAt ? differenceInDays(today, user.lastActiveAt) : -1;
            let activityStatus = 'Inactive';
            if (daysSinceLogin >= 0 && daysSinceLogin <= 2) activityStatus = 'Active';
            else if (daysSinceLogin > 2 && daysSinceLogin <= 7) activityStatus = 'Moderate';
            
            // Calculate frequency (average logins per week since joining)
            const daysSinceJoining = differenceInDays(today, user.createdAt) || 1;
            const weeksSinceJoining = daysSinceJoining / 7;
            const frequencyPerWeek = (user.totalLogins / weeksSinceJoining).toFixed(1);

            return {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                membership: user.membershipLevel,
                totalLogins: user.totalLogins,
                lastLogin: user.lastActiveAt,
                daysSinceLastLogin: daysSinceLogin === -1 ? 'Never' : daysSinceLogin,
                frequencyPerWeek,
                activityStatus,
                devicePreference: user.lastPlatform || 'Unknown'
            };
        });

        // Filter by activity if requested
        let finalUsers = transformedUsers;
        if (activity) {
            finalUsers = transformedUsers.filter(u => u.activityStatus === activity);
        }

        return NextResponse.json({
            users: finalUsers,
            totalUsers,
            page,
            limit
        });

    } catch (error) {
        console.error('Analytics Users Error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
