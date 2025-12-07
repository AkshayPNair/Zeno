import { DocumentEntity } from "../entities/DocumentEntity";

export interface IGetDocumentByIdService {
  execute(documentId: string): Promise<DocumentEntity | null>;
}
