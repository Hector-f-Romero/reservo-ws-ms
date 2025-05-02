import { Module } from "@nestjs/common";
import { SeatsEventsService } from "./seats-events.service";
import { SeatsEventsController } from "./seats-events.controller";
import { SeatsWsModule } from "src/seats-ws/seats-ws.module";

@Module({
	controllers: [SeatsEventsController],
	providers: [SeatsEventsService],
	imports: [SeatsWsModule],
})
export class SeatsEventsModule {}
