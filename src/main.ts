import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app.module";
import { enviromentVariables } from "./config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger("WebsocketServer");

	// 1. Set the global prefix for all endpoints.
	app.setGlobalPrefix("/api/v1");

	// 2. Start the server.
	await app.listen(enviromentVariables.port);

	logger.log(
		`Websocket server is running on port ${enviromentVariables.port} 🚀`,
	);
}
bootstrap();
