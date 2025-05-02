import { Inject, Injectable } from "@nestjs/common";
import { SeatsWsGateway } from "../seats-ws/seats-ws.gateway";
import { UpdateSeatStatusDto } from "./dto/update-seat-status.dto";

@Injectable()
export class SeatsEventsService {
	constructor(
		@Inject("SEATS_GATEWAY") private readonly seatWsGateway: SeatsWsGateway,
	) {}

	update(updateSeatEventDto: UpdateSeatStatusDto) {
		// Necesito emitir a todos los sockets que estén en la página de evento una nueva actualización sobre el estado de un asiento en concreto.
		this.seatWsGateway.wss
			.to(updateSeatEventDto.eventId)
			.emit("update-seat-status", {
				id: updateSeatEventDto.seatId,
				state: updateSeatEventDto.seatState,
			});
	}
}
