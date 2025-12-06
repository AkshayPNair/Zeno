import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true }
    },
    {timestamps:true}
)

export const UserModel = mongoose.model<UserDocument>('User',UserSchema)