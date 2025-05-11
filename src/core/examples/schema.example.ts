// Primitives
import { OpenApiArray } from "../schema/OpenApiArray";
import { OpenApiBoolean } from "../schema/OpenApiBoolean";
import { OpenApiInteger } from "../schema/OpenApiInteger";
import { OpenApiNumber } from "../schema/OpenApiNumber";
import { OpenApiObject } from "../schema/OpenApiObject";
import { OpenApiString } from "../schema/OpenApiString";

OpenApiNumber()
  .description("I am a OpenAPI Number!")
  .format("double")
  .default(1)
  .min(0.5)
  .max(2.5)
  .exclusiveMin();

OpenApiInteger()
  .description("I am a OpenAPI Integer!")
  .format("int64")
  .default(1)
  .min(0)
  .max(99)
  .exclusiveMax();

OpenApiString()
  .description("Unique identifier")
  .default("1238971891792")
  .format("uuid")
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

OpenApiBoolean()
  .description("I am a OpenAPI boolean!")
  .default(false)
  .nullable();

// Representing a Pet from the OpenAPI Petstore

const Pet = OpenApiObject()
  .property("id")
  .schema(OpenApiInteger().format("int64").example("10"))
  .property("name")
  .schema(OpenApiString().example("doggie"))
  .property("category")
  .schema(
    OpenApiObject()
      .property("id")
      .schema(OpenApiInteger().format("int64"))
      .property("name")
      .schema(OpenApiString().example("dogs"))
  )
  .property("photoUrls")
  .schema(OpenApiArray(OpenApiArray(OpenApiString())))
  .property("tags")
  .schema(
    OpenApiObject()
      .property("id")
      .schema(OpenApiInteger().format("int64"))
      .property("name")
      .schema(OpenApiString())
  )
  .property("status")
  .schema(
    OpenApiString()
      .enum("available")
      .enum("pending")
      .enum("sold")
      .description("pet status in the store.")
  );

console.log(JSON.stringify(Pet.toJSON(), null, 2));
