import { OpenApiMetadata } from "../core/OpenApiMetadata";
import { OpenApiRoute } from "../core/OpenApiRoute";

let metadata = new OpenApiMetadata();
let route = new OpenApiRoute("/api/v1/healthcheck/{id}");

metadata = metadata
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" });

metadata.addRoute(route)
