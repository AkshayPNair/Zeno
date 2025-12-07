export enum DocumentType {
    DOC = "doc",
    WHITEBOARD = "whiteboard",
    KANBAN = "kanban",
}

export interface DocumentResponse {
    id: string;
    title: string;
    type: DocumentType;
    ownerId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
