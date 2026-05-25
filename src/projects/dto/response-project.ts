export class ProjectResponseDto{
    id!:string;
    name!:string;
    description?:string;
    workspaceId!:string;
    createdAt!:Date;
    updatedAt!:Date;
}