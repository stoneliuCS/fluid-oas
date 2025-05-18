import { String, Number, Example, Object } from "../core";

const uuidSchema = String()
  .format("uuid")
  .example(Example().value("5e91507e-5630-4efd-9fd4-799178870b10"))
  .description("Id of the user.")
  .pattern(/stone/)
  .default("uuid");

const user = Object()
  .property("stone")
  .with(String())
  .property("id")
  .with(uuidSchema)
  .nullable();

console.log(user.toJSON());
