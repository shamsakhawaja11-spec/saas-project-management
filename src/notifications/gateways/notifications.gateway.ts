import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors:{origin:'*'},
})
export class NotificationsGateway implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()
    server!:Server;
    constructor(private jwtService:JwtService){}
    async handleConnection(client:Socket){
        try{
            const token=client.handshake.auth.token;
            const payload=this.jwtService.verify(token);
            client.data.userId=payload.sub;
            client.join(`user_${payload.sub}`);
            console.log(`User ${payload.sub} connected`)
        }
        catch{
            client.disconnect();
        }
    }
    handleDisconnect(client:Socket){
        console.log(`User ${client.data.userId} disconnected`)
    }
    sendNotificationToUser(userId:string,notification:any){
        this.server.to(`user_${userId}`).emit('notification',notification);
    }
}