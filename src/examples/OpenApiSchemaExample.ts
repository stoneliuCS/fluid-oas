import { OpenApiSchema } from "../core/OpenApiSchema";

const nameSchema = OpenApiSchema.create("string")
  .addExample("John Doe")
  .addMin(1);

const userSchema = OpenApiSchema.create("object")
  .addDescription("A representation of a user.")
  .addProperty("firstName")
  .addPropertyValue(nameSchema)
  .addProperty("lastName")
  .addPropertyValue(nameSchema);
