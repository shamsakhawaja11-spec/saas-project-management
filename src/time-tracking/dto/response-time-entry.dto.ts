import { Expose, Transform } from "class-transformer";

export class ResponseTimeEntryDto{
    @Expose()
    id!:string;
    @Expose()
    minutes!:string;
    @Expose()
    @Transform(({value})=>'${Math.floor(value/60)}h${value%60}m')
    formattedTime!:string;
    @Expose()
    descrption!:string;
    @Expose()
    logData!:string;
    @Expose()
    taskId!:string;
    @Expose()
    userId!:string;
    @Expose()
    createdAt!:string;
}