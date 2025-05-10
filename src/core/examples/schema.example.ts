// Primitives
import { OpenApiInteger } from "../schema/OpenApiInteger";
import { OpenApiNumber } from "../schema/OpenApiNumber";
import { OpenApiString } from "../schema/OpenApiString";

OpenApiNumber().description("I am a OpenAPI Number!")
  .format("double")
  .default(1)
  .min(0.5)
  .max(2.5)
  .exclusiveMin();

OpenApiInteger().description("I am a OpenAPI Integer!")
  .format("int64")
  .default(1)
  .min(0)
  .max(99)
  .exclusiveMax();

OpenApiString().description("Unique identifier")
  .default("1238971891792")
  .format("uuid")
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  );
