import { OpenApiMetadata } from "../core/OpenApiMetadata";

let metadata = new OpenApiMetadata();

metadata = metadata
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" });
