import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { SeatsEventsService } from "./seats-events.service";
import { UpdateSeatStatusDto } from "./dto/update-seat-status.dto";

@Controller()
export class SeatsEventsController {
	constructor(private readonly seatsEventsService: SeatsEventsService) {}

	@MessagePattern("update.seat.state")
	updateSeatState(@Payload() updateSeatsEventDto: UpdateSeatStatusDto) {
		return this.seatsEventsService.update(updateSeatsEventDto);
	}
}
