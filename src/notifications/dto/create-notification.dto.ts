import { IsEAN, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { NotificationType } from "../entities/notification.entity";

export class CreateNotificationDto{
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type!:NotificationType;
    @IsString()
    @IsNotEmpty()
    message!:string;
    @IsUUID()
    @IsNotEmpty()
    userId!:string;
    @IsOptional()
    metaData?:Record<string,any>;
}