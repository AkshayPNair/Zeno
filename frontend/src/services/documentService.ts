import api from './api'
import type { DocumentResponse } from '../types/document'
import { DocumentType } from '../types/document'

export const createDocument = async (title: string, type: DocumentType): Promise<DocumentResponse> => {
    const res = await api.post('/documents/create', { title, type })
    return res.data.data
}

export const fetchDocuments = async (): Promise<DocumentResponse[]> => {
    const res = await api.get("/documents");
    return res.data.data
}

export const getDocument = async (documentId: string): Promise<DocumentResponse> => {
    const res = await api.get(`/documents/${documentId}`);
    return res.data.data
}

export const updateDocument = async (documentId: string, content: string): Promise<DocumentResponse> => {
    const res = await api.put(`/documents/${documentId}`, { content })
    return res.data.data
}