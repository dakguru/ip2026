
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ... we don't need all fields for this check
    membershipLevel: { type: String, default: 'free', enum: ['free', 'silver', 'gold'] },
    planName: { type: String },
}, { timestamps: true, strict: false }); // strict false to allow other fields

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

async function checkUser() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI not found');
    }
    console.log('Connecting to DB...');
    await mongoose.connect(uri);
    console.log('Connected. Fetching user...');

    const user = await UserModel.findOne({ email: 'liveuser@gmail.com' });

    console.log('User details:', JSON.stringify(user, null, 2));

    await mongoose.disconnect();
}

checkUser().catch((err) => {
    console.error(err);
    process.exit(1);
});
