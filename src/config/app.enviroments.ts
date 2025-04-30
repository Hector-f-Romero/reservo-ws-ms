import "dotenv/config";
import * as Joi from "joi";

interface EnviromentVaraibles {
	PORT: number;
	NATS_SERVER: string;
}

const enviromentSchema = Joi.object({
	PORT: Joi.number().required(),
	NATS_SERVER: Joi.string().required(),
}).unknown();

// We synchronously read all the information from process.env and validate it against our schema.
// We must use dotenv to read the file before the web server is started with NestJS 10.
const { error, value } = enviromentSchema.validate({
	...process.env,
});

// If there is an error with the environment variables we defined, throw an error.
if (error) {
	throw new Error(`Enviroments error: ${error.message}`);
}

// We store the variables read from process.env in an object with our type.
// This step is only done to have types and autocomplete support, since "value" is of type any.
const env: EnviromentVaraibles = value;

// We export our custom environment variables for use throughout the application.
export const enviromentVariables = {
	port: env.PORT,
	natsSever: env.NATS_SERVER,
};
