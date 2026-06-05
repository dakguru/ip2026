import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    role: { type: String },
    membershipLevel: { type: String }
}, { strict: false });

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

async function listAdmins() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI not found');
    }
    console.log('Connecting to DB...');
    await mongoose.connect(uri);
    console.log('Connected. Fetching admin users...');

    const admins = await UserModel.find({ role: 'admin' });
    console.log('Admins found:', admins.length);
    admins.forEach(admin => {
        console.log(`Name: ${admin.name}, Email: ${admin.email}, Role: ${admin.role}, Level: ${admin.membershipLevel}`);
    });

    // Also check for 'Admin' with capital A
    const capAdmins = await UserModel.find({ role: 'Admin' });
    console.log('Admins with capital A found:', capAdmins.length);
    capAdmins.forEach(admin => {
        console.log(`Name: ${admin.name}, Email: ${admin.email}, Role: ${admin.role}, Level: ${admin.membershipLevel}`);
    });

    await mongoose.disconnect();
}

listAdmins().catch(console.error);
