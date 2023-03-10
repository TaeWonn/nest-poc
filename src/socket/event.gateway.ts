import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users = {};
  socketRoom = {};
  MAXIMUM = 5;

  handleConnection(client: Socket): any {
    console.log(`connected id is ${client.id}`);
    //client[client['id']] = client;
  }

  handleDisconnect(socket: Socket): any {
    console.log('disconnected id is ', socket['id']);
    //delete client[client['id']];
    const roomID = this.socketRoom[socket.id];

    if (this.users[roomID]) {
      this.users[roomID] = this.users[roomID].filter(
        (user) => user.id !== socket.id,
      );
      if (this.users[roomID].length === 0) {
        delete this.users[roomID];
        return;
      }
    }
    delete this.socketRoom[socket.id];
    socket.broadcast
      .to(this.users[roomID])
      .emit('user_exit', { id: socket.id });
  }

  @SubscribeMessage('join_room')
  joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    console.log(`join room ${socket.id}, ${data}`);
    if (this.users[data.room]) {
      // 현재 입장하려는 방에 있는 인원수
      const currentRoomLength = this.users[data.room].length;
      if (currentRoomLength === this.MAXIMUM) {
        // 인원수가 꽉 찼다면 돌아갑니다.
        socket.to(socket.id).emit('room_full');
        return;
      }

      // 여분의 자리가 있다면 해당 방 배열에 추가해줍니다.
      this.users[data.room] = [...this.users[data.room], { id: socket.id }];
    } else {
      // 방이 존재하지 않다면 값을 생성하고 추가해줍시다.
      this.users[data.room] = [{ id: socket.id }];
    }
    this.socketRoom[socket.id] = data.room;

    // 입장
    socket.join(data.room);

    // 입장하기 전 해당 방의 다른 유저들이 있는지 확인하고
    // 다른 유저가 있었다면 offer-answer을 위해 알려줍니다.
    const others = this.users[data.room].filter(
      (user) => user.id !== socket.id,
    );
    if (others.length) {
      this.server.sockets.to(socket.id).emit('all_users', others);
    }
  }

  @SubscribeMessage('offer')
  offer(@ConnectedSocket() socket: Socket, @MessageBody() { roomName, sdp }) {
    console.log(`offer: roomName: ${roomName}`);
    socket.to(roomName).emit('getOffer', sdp);
  }

  @SubscribeMessage('answer')
  answer(@ConnectedSocket() socket: Socket, @MessageBody() { roomName, sdp }) {
    console.log(`answer roomName: ${roomName}`);
    socket.to(roomName).emit('getAnswer', sdp);
  }

  @SubscribeMessage('candidate')
  candidate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { candidate, roomName },
  ) {
    console.log(
      `answer roomName: ${roomName}, candidate: ${JSON.stringify(candidate)}`,
    );
    socket.to(roomName).emit('getCandidate', candidate);
  }
}
