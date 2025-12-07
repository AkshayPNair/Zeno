import { DocumentEntity } from "../entities/DocumentEntity";

export interface IUpdateDocumentContentService {
  execute(documentId: string, content: string): Promise<DocumentEntity | null>;
}
