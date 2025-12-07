import { create } from "zustand";
import type { DocumentResponse } from "../types/document";

interface DocumentState {
    documents: DocumentResponse[]
    setDocuments: (docs: DocumentResponse[]) => void
    addDocument: (doc: DocumentResponse) => void
}

export const useDocumentStore = create<DocumentState>((set) => ({
    documents: [],
    setDocuments: (docs) => set({ documents: docs }),
    addDocument: (doc) => set((state) => ({ documents: [doc, ...state.documents] }))
}))