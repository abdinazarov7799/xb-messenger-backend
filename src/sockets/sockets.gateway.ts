import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthGuard } from '../auth/socket-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(SocketAuthGuard)
export class SocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const user = (client as any).user;
    console.log(`Client connected: ${client.id}, User: ${user.username}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, data: { chatId: number }) {
    const user = (client as any).user;
    console.log(`User ${user.username} joined chat_${data.chatId}`);
    client.join(`chat_${data.chatId}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, data: { chatId: number; content: any; mediaType: 'text' | 'file' }) {
    const user = (client as any).user;
    console.log(`User ${user.username} sent a message to chat_${data.chatId}`);
    this.server.to(`chat_${data.chatId}`).emit('newMessage', {
      senderId: user.userId,
      chatId: data.chatId,
      content: data.content,
      mediaType: data.mediaType,
    });
  }
}
