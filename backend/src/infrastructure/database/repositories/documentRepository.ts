import { CreateDocumentDTO } from "../../../domain/dtos/createDocument.dto";
import { DocumentEntity } from "../../../domain/entities/DocumentEntity";
import { IDocumentRepository } from "../../../domain/interfaces/IDocumentRepository";
import { DocumentModel } from "../models/DocumentModel";

export class DocumentRepository implements IDocumentRepository {
    async createDocument(payload: CreateDocumentDTO): Promise<DocumentEntity> {
        const doc = await DocumentModel.create({
            title: payload.title,
            type: payload.type,
            ownerId: payload.ownerId,
            content: ""
        })

        return {
            id: doc._id.toString(),
            title: doc.title,
            type: doc.type,
            ownerId: doc.ownerId,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }
    }

    async getDocumentByUser(userId: string): Promise<DocumentEntity[]> {
        const docs = await DocumentModel.find({ ownerId: userId }).sort({ updatedAt: -1 })
        return docs.map((doc) => ({
            id: doc._id.toString(),
            title: doc.title,
            type: doc.type,
            ownerId: doc.ownerId,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }))
    }

    async getDocumentById(documentId: string): Promise<DocumentEntity | null> {
        const doc = await DocumentModel.findById(documentId)
        if (!doc) return null
        return {
            id: doc._id.toString(),
            title: doc.title,
            type: doc.type,
            ownerId: doc.ownerId,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }
    }

    async updateDocumentContent(documentId: string, content: string): Promise<DocumentEntity | null> {
        const doc = await DocumentModel.findByIdAndUpdate(
            documentId,
            { content },
            { new: true }
        )
        if (!doc) return null
        return {
            id: doc._id.toString(),
            title: doc.title,
            type: doc.type,
            ownerId: doc.ownerId,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }
    }
}