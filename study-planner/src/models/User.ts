
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    mobile: { type: String },
    designation: { type: String },
    pincode: { type: String },
    officeName: { type: String },
    division: { type: String },
    circle: { type: String },
    gender: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    membershipLevel: { type: String, default: 'free', enum: ['free', 'silver', 'gold'] },
    resetToken: { type: String },
    resetTokenExpiry: { type: Number },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
