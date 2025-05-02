import { Module } from "@nestjs/common";

import { SeatsWsModule } from "./seats-ws/seats-ws.module";
import { SeatsEventsModule } from "./seats-events/seats-events.module";

@Module({
	imports: [SeatsWsModule, SeatsEventsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
