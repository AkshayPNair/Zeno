import { CreateDocumentDTO } from "../dtos/createDocument.dto";
import { DocumentEntity } from "../entities/DocumentEntity";

export interface ICreateDocumentService {
  execute(payload: CreateDocumentDTO): Promise<DocumentEntity>;
}
