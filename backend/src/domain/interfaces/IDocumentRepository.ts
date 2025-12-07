import { CreateDocumentDTO } from "../dtos/createDocument.dto";
import { DocumentEntity } from "../entities/DocumentEntity";

export interface IDocumentRepository{
    createDocument(payload:CreateDocumentDTO):Promise<DocumentEntity>;
    getDocumentByUser(userId:string):Promise<DocumentEntity[]>;
    getDocumentById(documentId:string):Promise<DocumentEntity | null>;
    updateDocumentContent(documentId:string,content:string):Promise<DocumentEntity | null>;
}