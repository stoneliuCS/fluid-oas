import { OpenApiBuilder } from "../core/OpenApiBuilder";
import { OpenApiSchema } from "../core/OpenApiSchema";
import { OpenApiMetadata } from "../core/OpenApiMetadata";
import { OpenApiRoute } from "../core/OpenApiRoute";
import { OpenApiContentType, OpenApiStatusCode } from "../types/OpenApiTypes";

let metadata = new OpenApiMetadata();
// Define the healthcheck endpoint in a completely object oriented fashion
const healthcheck = new OpenApiRoute("/api/v1/healthcheck")
  .addGetOperation()

  .addResponse(OpenApiStatusCode.OK, "Ping the health of the server.")
  .addContentType(OpenApiContentType.JSON)
  .addSchema(new OpenApiSchema())

  .addResponse(OpenApiStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
  .addContentType(OpenApiContentType.JSON)
  .addSchema(new OpenApiSchema())
  .return();

metadata = metadata
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(healthcheck);

const openapi = new OpenApiBuilder(metadata);
console.log(openapi)

