import { Module } from "@nestjs/common";

import { SeatsService } from "./seats-ws.service";
import { SeatsWsGateway } from "./seats-ws.gateway";

@Module({
	providers: [
		{
			provide: "SEATS_GATEWAY",
			useClass: SeatsWsGateway,
		},
		SeatsService,
	],
	exports: ["SEATS_GATEWAY"],
})
export class SeatsWsModule {}
