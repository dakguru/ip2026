
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    mobile: { type: String },
    examPreparingFor: { type: String },
    dateOfJoining: { type: Date },
    gender: { type: String },
    courseMode: { type: String, enum: ['LDCE_IP', 'PS_GR_B'], default: 'LDCE_IP' },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    membershipLevel: { type: String, default: 'free', enum: ['free', 'silver', 'gold'] },
    membershipValidity: { type: Date }, // Date when membership expires
    planId: { type: String }, // ID of the plan purchased
    planName: { type: String }, // Name of the plan purchased
    purchaseDate: { type: Date }, // Date when plan was purchased
    resetToken: { type: String },
    resetTokenExpiry: { type: Number },
    currentSessionId: { type: String },
    lastActiveAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
