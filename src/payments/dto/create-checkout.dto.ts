import { IsEnum, IsNotEmpty } from 'class-validator';
import { PlanType } from '../entities/subscription.entity';

export class CreateCheckoutDto {
  @IsEnum(PlanType)
  @IsNotEmpty()
  plan!: PlanType;
}