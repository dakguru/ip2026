import dbConnect from './mongoose';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

export interface User {
    id: string; // Mapped from _id
    email: string;
    name: string;
    mobile?: string;
    examPreparingFor?: string;
    dateOfJoining?: Date;
    gender?: string;
    courseMode?: string;
    lastPlatform?: 'desktop' | 'mobile_browser' | 'app';
    hasSeenCoursePrompt?: boolean;
    passwordHash?: string; // Optional in interface, but mostly present
    role?: 'user' | 'admin';
    membershipLevel?: 'free' | 'silver' | 'gold' | 'diamond' | 'platinum';
    membershipValidity?: string;
    planId?: string;
    planName?: string;
    purchaseDate?: string;
    resetToken?: string;
    resetTokenExpiry?: number;

    currentSessionId?: string;
    lastActiveAt?: string;
    createdAt: string;
}

// Helper to map Mongoose document to User interface
function mapUser(doc: any): User {
    return {
        id: doc._id.toString(),
        email: doc.email,
        name: doc.name,
        mobile: doc.mobile,
        examPreparingFor: doc.examPreparingFor,
        dateOfJoining: doc.dateOfJoining,
        gender: doc.gender,
        courseMode: doc.courseMode,
        lastPlatform: doc.lastPlatform,
        hasSeenCoursePrompt: doc.hasSeenCoursePrompt,
        passwordHash: doc.password, // Mapped from password field in DB
        role: doc.role,
        membershipLevel: doc.membershipLevel,
        membershipValidity: doc.membershipValidity ? new Date(doc.membershipValidity).toISOString() : undefined,
        planId: doc.planId,
        planName: doc.planName,
        purchaseDate: doc.purchaseDate ? new Date(doc.purchaseDate).toISOString() : undefined,
        resetToken: doc.resetToken,
        resetTokenExpiry: doc.resetTokenExpiry,

        currentSessionId: doc.currentSessionId,
        lastActiveAt: doc.lastActiveAt ? new Date(doc.lastActiveAt).toISOString() : undefined,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    };
}

export async function getAllUsers(): Promise<User[]> {
    await dbConnect();
    const users = await UserModel.find({});
    return users.map(mapUser);
}

export async function getUserByEmail(email: string): Promise<User | null> {
    await dbConnect();
    const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } });
    return user ? mapUser(user) : null;
}

export async function getUserByResetToken(token: string): Promise<User | null> {
    await dbConnect();
    const user = await UserModel.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    });
    return user ? mapUser(user) : null;
}

export async function createUser(
    email: string,
    password: string,
    name: string,
    additionalData: Partial<User> = {},
    role: 'user' | 'admin' = 'user'
): Promise<User> {
    await dbConnect();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        email,
        password: passwordHash, // Store hash in 'password' field
        name,
        role,
        ...additionalData
    });

    return mapUser(newUser);
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
    await dbConnect();
    // Case-insensitive lookup so users with uppercase emails (legacy) can still log in
    const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    // Check for membership expiry and downgrade if needed
    if (user.membershipLevel !== 'free' && user.membershipValidity && new Date(user.membershipValidity) < new Date()) {
        user.membershipLevel = 'free';
        user.planId = '';
        user.planName = '';
        await user.save();
    }

    return mapUser(user);
}

export async function updateSessionById(userId: string, sessionId: string): Promise<boolean> {
    await dbConnect();
    const result = await UserModel.updateOne(
        { _id: userId },
        { $set: { currentSessionId: sessionId, lastActiveAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function updateUser(currentEmail: string, updates: Partial<User>): Promise<User | null> {
    await dbConnect();

    // Check if email check is needed
    if (updates.email && updates.email.toLowerCase() !== currentEmail.toLowerCase()) {
        const existing = await UserModel.findOne({ email: updates.email });
        if (existing) {
            throw new Error("Email already in use");
        }
    }

    // Map User interface fields to Mongoose schema fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mongoUpdates: any = { ...updates };

    // Map passwordHash -> password
    if (mongoUpdates.passwordHash) {
        mongoUpdates.password = mongoUpdates.passwordHash;
        delete mongoUpdates.passwordHash;
    }

    // Remove id if present (cannot update _id)
    if (mongoUpdates.id) {
        delete mongoUpdates.id;
    }

    const user = await UserModel.findOneAndUpdate(
        { email: { $regex: new RegExp(`^${currentEmail.trim()}$`, 'i') } },
        { $set: mongoUpdates },
        { new: true } // Return updated document
    );

    return user ? mapUser(user) : null;
}

export async function updateSession(email: string, sessionId: string): Promise<boolean> {
    await dbConnect();
    const result = await UserModel.updateOne(
        { email },
        { $set: { currentSessionId: sessionId, lastActiveAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function validateSession(email: string, sessionId: string): Promise<{ status: 'valid' | 'conflict' | 'invalid', downgraded?: boolean, membershipLevel?: string }> {
    await dbConnect();
    const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) return { status: 'invalid' };

    let downgraded = false;
    // Check for membership expiry and downgrade if needed
    if (user.membershipLevel !== 'free' && user.membershipValidity && new Date(user.membershipValidity) < new Date()) {
        await UserModel.updateOne(
            { _id: user._id },
            { $set: { membershipLevel: 'free', planId: '', planName: '' } }
        );
        downgraded = true;
        user.membershipLevel = 'free'; // Update local object for return
    }

    if (!user.currentSessionId) {
        return { status: 'invalid' }; // No session established yet — treat as expired, not conflict
    }

    if (user.currentSessionId !== sessionId) {
        return { status: 'conflict' };
    }

    // Fire and forget update to keep validation fast
    UserModel.updateOne({ _id: user._id }, { $set: { lastActiveAt: new Date() } }).catch(err => console.error("Failed to update activity", err));

    return {
        status: 'valid',
        downgraded,
        membershipLevel: user.membershipLevel
    };
}
