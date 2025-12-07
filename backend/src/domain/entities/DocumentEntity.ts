export interface DocumentEntity{
    id?:string;
    title:string;
    type:'doc'| 'whiteboard'|'kanban';
    ownerId:string;
    content?:string;
    createdAt?:Date;
    updatedAt?:Date;
}