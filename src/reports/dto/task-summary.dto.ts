import { DriverUtils } from "typeorm/driver/DriverUtils.js";

export class TaskSummaryDto{
    boardId!:string;
    boardName!:string;
    total!:number;
    todo!:number;
    inProgress!:number;
    inReview!:number;
    done!:number;
    overDue!:number;
}