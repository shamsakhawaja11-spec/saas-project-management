import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { NotificationsRepository } from "./repositories/notifications.repository";
import { NotificationsService } from "./services/notifications.service";
import { NotificationsController } from "./controllers/notifications.controller";
import { NotificationsGateway } from "./gateways/notifications.gateway";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([Notification]),
    JwtModule.register({
        secret:'meandme',
        signOptions:{expiresIn:'7d'},
    }),
    ],
    controllers:[NotificationsController],
    providers:[NotificationsRepository,NotificationsService,NotificationsGateway],
    exports:[NotificationsService],
})
export class NotificationsModule{}