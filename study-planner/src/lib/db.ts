import dbConnect from './mongoose';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

export interface User {
    id: string; // Mapped from _id
    email: string;
    name: string;
    mobile?: string;
    designation?: string;
    pincode?: string;
    officeName?: string;
    division?: string;
    circle?: string;
    gender?: string;
    passwordHash?: string; // Optional in interface, but mostly present
    role?: 'user' | 'admin';
    membershipLevel?: 'free' | 'silver' | 'gold';
    resetToken?: string;
    resetTokenExpiry?: number;
    createdAt: string;
}

// Helper to map Mongoose document to User interface
function mapUser(doc: any): User {
    return {
        id: doc._id.toString(),
        email: doc.email,
        name: doc.name,
        mobile: doc.mobile,
        designation: doc.designation,
        pincode: doc.pincode,
        officeName: doc.officeName,
        division: doc.division,
        circle: doc.circle,
        gender: doc.gender,
        passwordHash: doc.password, // Mapped from password field in DB
        role: doc.role,
        membershipLevel: doc.membershipLevel,
        resetToken: doc.resetToken,
        resetTokenExpiry: doc.resetTokenExpiry,
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
    const user = await UserModel.findOne({ email });
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
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return mapUser(user);
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
        { email: currentEmail },
        { $set: mongoUpdates },
        { new: true } // Return updated document
    );

    return user ? mapUser(user) : null;
}
