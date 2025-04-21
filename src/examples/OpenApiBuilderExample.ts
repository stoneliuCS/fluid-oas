import { OpenApiBuilder } from "../core/OpenApiBuilder";
import { OpenApiMetadata } from "../core/OpenApiMetadata";
import { OpenApiRoute } from "../core/OpenApiRoute";

let metadata = new OpenApiMetadata();
const healthcheck = new OpenApiRoute("/api/v1/healthcheck");
const users = new OpenApiRoute("/api/v1/users/");

metadata = metadata
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(healthcheck)
  .addRoute(users)

const openapi = new OpenApiBuilder(metadata)

openapi.toOpenApi()
