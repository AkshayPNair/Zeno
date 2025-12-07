import { useDocumentStore } from "../store/documentStore";
import { createDocument, fetchDocuments } from "../services/documentService";
import  { DocumentType } from "../types/document";

export const useDocuments = () => {
    const { documents, setDocuments, addDocument } = useDocumentStore()
    const loadDocuments = async () => {
        const data = await fetchDocuments()
        setDocuments(data)
    }
    const createNewDocument = async (title: string, type: DocumentType) => {
        const doc = await createDocument(title, type)
        addDocument(doc)
        return doc
    }
    return { documents, loadDocuments, createNewDocument }
}