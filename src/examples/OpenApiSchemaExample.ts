import { OpenApiObject, OpenApiString } from "../core/OpenApiSchema";

const uuidSchema = OpenApiString.addFormat("uuid")
  .addExample("5e91507e-5630-4efd-9fd4-799178870b10")
  .addDescription("A unique format for the user.");

const nameSchema = OpenApiString.addMinLength(1);

const modeSchema = OpenApiString.addEnum("BASIC")
  .addEnum("NORMAL")
  .addEnum(null);

const userSchema = OpenApiObject.addProperty("username")
  .addPropertyValue(nameSchema)
  .addProperty("id")
  .addPropertyValue(uuidSchema)
  .addProperty()
