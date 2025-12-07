import { DocumentEntity } from "../entities/DocumentEntity";

export interface IGetDocumentByUserService {
  execute(userId: string): Promise<DocumentEntity[]>;
}
