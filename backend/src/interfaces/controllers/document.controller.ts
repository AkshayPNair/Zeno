import { NextFunction, Request, Response } from "express";
import { ICreateDocumentService } from "../../domain/interfaces/ICreateDocumentService";
import { IGetDocumentByIdService } from "../../domain/interfaces/IGetDocumentByIdService";
import { IGetDocumentByUserService } from "../../domain/interfaces/IGetDocumentByUserService";
import { IUpdateDocumentContentService } from "../../domain/interfaces/IUpdateDocumentContentService";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { AuthRequest } from "../middleware/authMiddleware";

export class DocumentController {
    constructor(
        private _createDocumentService: ICreateDocumentService,
        private _getDocumentByUserService: IGetDocumentByUserService,
        private _getDocumentByIdService: IGetDocumentByIdService,
        private _updateDocumentContentService: IUpdateDocumentContentService
    ) { }

    async createDocument(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const payload = {
                title: req.body.title,
                type: req.body.type,
                ownerId: req.userId!
            }
            const document = await this._createDocumentService.execute(payload);
            res.status(HttpStatusCode.CREATED).json({ success: true, data: document })
        } catch (error) {
            next(error)
        }
    }

    async listDocuments(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!
            const documents = await this._getDocumentByUserService.execute(userId)
            res.status(HttpStatusCode.OK).json({ success: true, data: documents })
        } catch (error) {
            next(error)
        }
    }

    async getDocument(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const documentId = req.params.documentId
            const document = await this._getDocumentByIdService.execute(documentId)
            res.status(HttpStatusCode.OK).json({ success: true, data: document })
        } catch (error) {
            next(error)
        }
    }

    async updateContent(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const documentId = req.params.documentId
            const { content } = req.body
            const updatedDoc = await this._updateDocumentContentService.execute(documentId, content)
            res.status(HttpStatusCode.OK).json({ success: true, data: updatedDoc })
        } catch (error) {
            next(error)
        }
    }
}