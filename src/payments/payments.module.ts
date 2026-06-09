import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Subscription } from "./entities/subscription.entity";
import { User } from "../users/entities/user.entity";
import { PaymentsService } from "./services/payments.service";
import { PaymentsController } from "./controllers/payments.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, User]),
    ConfigModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}