import { String, Example, Object, Response, Header, Number } from "../core";

const uuidSchema = String()
  .format("uuid")
  .example(Example().value("5e91507e-5630-4efd-9fd4-799178870b10"))
  .description("Id of the user.")
  .pattern(/stone/)
  .default("uuid");

const nameSchema = String()
  .minLength(1)
  .maxLength(10)
  .description("Name Schema.");

const user = Object()
  .property("firstName")
  .with(nameSchema)
  .property("id")
  .with(uuidSchema)
  .property("lastName")
  .with(nameSchema);

Response("My new Response!")
  .headers("content")
  .with(Header("schema").schema(Number()));

console.log(JSON.stringify(user, undefined, 2));
