import { DocumentEntity } from "../../../domain/entities/DocumentEntity";
import { IDocumentRepository } from "../../../domain/interfaces/IDocumentRepository";
import { IGetDocumentByIdService } from "../../../domain/interfaces/IGetDocumentByIdService";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class GetDocumentByIdUseCase implements IGetDocumentByIdService {
    constructor(private _documentRepository: IDocumentRepository) { }

    async execute(documentId: string): Promise<DocumentEntity | null> {
        const doc = await this._documentRepository.getDocumentById(documentId)
        if (!doc) {
            throw new AppError(
                ErrorCode.NOT_FOUND,
                "Document not found",
                HttpStatusCode.NOT_FOUND
            )
        }
        return doc
    }
}