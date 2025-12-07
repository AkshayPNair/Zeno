import mongoose, { Schema, Document } from "mongoose";

export interface DocumentDB extends Document {
    title: string;
    type: 'doc' | 'whiteboard' | 'kanban';
    ownerId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new Schema<DocumentDB>(
    {
        title: { type: String, required: true },
        type: { type: String, required: true },
        ownerId: { type: String, required: true },
        content: { type: String, default: "" }
    },
    { timestamps: true }
);

export const DocumentModel = mongoose.model<DocumentDB>('Document', DocumentSchema)