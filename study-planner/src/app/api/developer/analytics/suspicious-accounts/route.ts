import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const suspiciousUsers = await User.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    mobile: 1,
                    knownDevices: 1,
                    activeDevicesCount: {
                        $size: {
                            $filter: {
                                input: "$knownDevices",
                                as: "device",
                                cond: { $gte: ["$$device.lastSeen", sevenDaysAgo] }
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    activeDevicesCount: { $gt: 3 }
                }
            },
            {
                $sort: { activeDevicesCount: -1 }
            }
        ]);

        return NextResponse.json({ users: suspiciousUsers });
    } catch (error) {
        console.error('Failed to fetch suspicious accounts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
