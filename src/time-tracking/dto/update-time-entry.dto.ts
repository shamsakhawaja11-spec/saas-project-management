import { PartialType } from "@nestjs/mapped-types";
import { CreateTimeEntryDto } from "./create-time-entry.dto";
import { OmitType } from "@nestjs/mapped-types";
export class UpdateTimeEntryDto extends PartialType(
    OmitType(CreateTimeEntryDto,['taskId']as const)){}