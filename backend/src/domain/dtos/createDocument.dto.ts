export interface CreateDocumentDTO{
    title:string;
    type:'doc'|'whiteboard'|'kanban';
    ownerId:string;
}