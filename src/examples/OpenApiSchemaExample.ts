import { OpenApiObject, OpenApiString } from "../core/OpenApiSchema";

const uuidSchema = OpenApiString.format("uuid").example(
  "5e91507e-5630-4efd-9fd4-799178870b10",
);

const minString = OpenApiString.min(1);

const userSchema = OpenApiObject.description("A representation of a User.")
  .property("name", minString.description("Name of the User."))
  .property("username", minString.description("Display name of the user."))
  .property("id", uuidSchema.description("Unique identifier for the user."));
