
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import UserModel from '@/models/User';
import { differenceInDays } from 'date-fns';

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

        const userStatsAgg = await UserModel.aggregate([
            { $match: baseMatch },
            {
                $lookup: {
                    from: 'loginlogs',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'allLogins'
                }
            },
            {
                $lookup: {
                    from: 'loginlogs',
                    let: { uid: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$userId', '$$uid'] },
                                        { $eq: ['$status', 'success'] }
                                    ]
                                }
                            }
                        },
                        { $sort: { loginAt: -1 } },
                        { $limit: 10 }
                    ],
                    as: 'recentLogins'
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
                    lastPlatform: 1,
                    totalLogins: { $size: '$allLogins' },
                    deviceType: {
                        $arrayElemAt: [
                            {
                                $map: {
                                    input: { $slice: ['$allLogins', -1] },
                                    as: 'd',
                                    in: '$$d.device.type'
                                }
                            },
                            0
                        ]
                    },
                    lastIp: {
                        $arrayElemAt: [
                            { $map: { input: '$recentLogins', as: 'l', in: '$$l.ip' } },
                            0
                        ]
                    },
                    distinctIpCount: {
                        $size: {
                            $setDifference: [
                                { $map: { input: '$recentLogins', as: 'l', in: '$$l.ip' } },
                                [null, '', '0.0.0.0']
                            ]
                        }
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

            const daysSinceJoining = differenceInDays(today, user.createdAt) || 1;
            const weeksSinceJoining = daysSinceJoining / 7;
            const frequencyPerWeek = (user.totalLogins / weeksSinceJoining).toFixed(1);

            const distinctIpCount = user.distinctIpCount || 0;
            const suspiciousFlag = distinctIpCount > 1;

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
                devicePreference: user.lastPlatform || 'Unknown',
                lastIp: user.lastIp || null,
                distinctIpCount,
                suspiciousFlag
            };
        });

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
