import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIosInterest extends Document {
    ip: string;
    createdAt: Date;
}

const IosInterestSchema: Schema = new Schema({
    ip: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

// Check if the model is already defined to prevent overwriting during hot reloads
const IosInterest: Model<IIosInterest> = mongoose.models.IosInterest || mongoose.model<IIosInterest>('IosInterest', IosInterestSchema);

export default IosInterest;
