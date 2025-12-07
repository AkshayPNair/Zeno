import { CreateDocumentDTO } from "../../../domain/dtos/createDocument.dto";
import { DocumentEntity } from "../../../domain/entities/DocumentEntity";
import { ICreateDocumentService } from "../../../domain/interfaces/ICreateDocumentService";
import { IDocumentRepository } from "../../../domain/interfaces/IDocumentRepository";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class CreateDocumentUseCase implements ICreateDocumentService {
    constructor(private _documentRepository: IDocumentRepository) { }

    async execute(payload: CreateDocumentDTO): Promise<DocumentEntity> {
        if (!payload.title || !payload.ownerId) {
            throw new AppError(
                ErrorCode.BAD_REQUEST,
                "Title and ownerId are required",
                HttpStatusCode.BAD_REQUEST
            )
        }
        const document = await this._documentRepository.createDocument(payload)
        return document
    }
}