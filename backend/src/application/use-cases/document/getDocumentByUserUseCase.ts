import { DocumentEntity } from "../../../domain/entities/DocumentEntity";
import { IDocumentRepository } from "../../../domain/interfaces/IDocumentRepository";
import { IGetDocumentByUserService } from "../../../domain/interfaces/IGetDocumentByUserService";

export class GetDocumentByUserUseCase implements IGetDocumentByUserService {
    constructor(private _documentRepository: IDocumentRepository) { }

    async execute(userId: string): Promise<DocumentEntity[]> {
        return this._documentRepository.getDocumentByUser(userId)
    }
}