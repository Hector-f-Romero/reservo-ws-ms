import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { SeatsService } from "./seats-ws.service";

@WebSocketGateway({ cors: true })
export class SeatsWsGateway implements OnGatewayConnection {
	constructor(private readonly seatsService: SeatsService) {}

	// Declaring the WebSocket server instance here allows other services to access and use it via dependency injection.
	@WebSocketServer()
	wss: Server;

	// Implements "onGatewayConnection" to handle when user connects first time.
	handleConnection(@ConnectedSocket() client: Socket, ...args: unknown[]) {
		console.log(`Nuevo usuario conectado: ${client.id}`);
	}

	@SubscribeMessage("join-event-room")
	handleJoinEventRoom(
		@MessageBody() payload: { eventId: string },
		@ConnectedSocket() client: Socket,
	) {
		console.log("Logic for joining into room");
		console.log(payload);

		// Join user to eventId room for know in real time which seats are available.
		client.join(payload.eventId);
		console.log(
			`Cliente unido satisfactoriamente a la sala: ${payload.eventId}`,
		);

		return `Conectado a la sala correctamente: ${payload.eventId}`;
	}
}
