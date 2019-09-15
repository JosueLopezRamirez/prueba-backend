import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

    private logger = new Logger('ChatGateway');

    @WebSocketServer() server;

    handleConnection(client){
        this.logger.debug('New client connected')
        client.emit('connection', `Successfully connected to Server`);
    }

    handleDisconnect(){
        this.server.emit('users', '');
    }
}