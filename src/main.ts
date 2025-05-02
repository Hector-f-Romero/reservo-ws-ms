import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app.module";
import { enviromentVariables } from "./config";

async function bootstrap() {
	const logger = new Logger("HybridApp");

	// Para este caso puntual, donde propiamente estoy complicando el contexto al querer crear un microservicio que escuche websockets, necesito crear una app híbrida, pues ms no escucha un puerto ni usa HTTP/TPC para mandar la información.
	// Crearé un listerner para escuchar los eventos que vengan del NATS y crearé una app HTTP para montar los websockets.
	// https://docs.nestjs.com/faq/hybrid-application

	// 1. Crear la app sobre la cuál correrán los websockets (tiene que estar montada por TCP - HTTP)
	const appWebsockets = await NestFactory.create(AppModule);

	// 2. Crear la coneción al microservicio usando la misma app. Se define la capa de transporte de NATS.
	const microserviceNATS =
		appWebsockets.connectMicroservice<MicroserviceOptions>({
			transport: Transport.NATS,
			options: {
				servers: enviromentVariables.natsSever,
			},
		});

	// 3. Arranco los microservicios para que se conecten al broaker.
	await appWebsockets.startAllMicroservices();
	logger.log(
		`Microservice connected successfully to NATS server ${enviromentVariables.natsSever} ✅`,
	);

	// 4. Arranco el servidor HTTP para que funcionen los websockets.
	await appWebsockets.listen(enviromentVariables.port);

	logger.log(
		`Websocket server is running on port ${enviromentVariables.port} 🚀`,
	);
}
bootstrap();
