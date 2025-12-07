import { DocumentEntity } from "../../../domain/entities/DocumentEntity";
import { IDocumentRepository } from "../../../domain/interfaces/IDocumentRepository";
import { IUpdateDocumentContentService } from "../../../domain/interfaces/IUpdateDocumentContentService";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class UpdateDocumentContentUseCase implements IUpdateDocumentContentService{
    constructor(private _documentRepository:IDocumentRepository){}

    async execute(documentId: string, content: string): Promise<DocumentEntity | null> {
        const updatedDoc=await this._documentRepository.updateDocumentContent(documentId,content)
        if (!updatedDoc) {
            throw new AppError(
              ErrorCode.NOT_FOUND,
              "Document not found",
              HttpStatusCode.NOT_FOUND
            )
          }
          return updatedDoc
    }
}