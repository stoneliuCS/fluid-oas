import {
  Example,
  Info,
  Object,
  Operation,
  Parameter,
  Path,
  PathItem,
  Response,
  Responses,
  String,
} from "../core";
import { MediaType } from "../core/common/OpenApiMedia";
import { OpenApiV311 } from "../core/openapiv3";

const info = Info("My API", "v1.0.0")
  .addDescription("Add an example description")
  .addSummary("Get autocomplete and typescript typechecking too!");

// Example schemas

const nameSchema = String()
  .addMinLength(1)
  .addMaxLength(10)
  .addExample(Example().addValue("John"))
  .addDescription("Name of the person.");

const uuidSchema = String()
  .addFormat("uuid")
  .addExample(
    Example()
      .addValue("5e91507e-5630-4efd-9fd4-799178870b10")
      .addDescription("Unique Identifier.")
  );

const userSchema = Object()
  .addProperty("firstName", nameSchema)
  .addProperty("lastName", nameSchema)
  .addProperty("id", uuidSchema);

const errorSchema = Object().addProperty("message", String());

const getUserResponses = Responses()
  .addResponse(
    "200",
    Response("Successfully Retrieved User!").addContent(
      "application/json",
      MediaType().addSchema(userSchema)
    )
  )
  .addResponse(
    "401",
    Response("Unauthorized").addContent(
      "application/json",
      MediaType().addSchema(errorSchema)
    )
  );

// Declare Path Items
const getUser = PathItem().addMethod(
  "get",
  Operation()
    .addParameters([
      Parameter("schema")
        .addName("id")
        .addIn("path")
        .required()
        .addSchema(uuidSchema),
    ])
    .addResponses(getUserResponses)
);

// Register Paths
const path = Path()
  .beginGroup("/api/v1")
  .addEndpoint("/user/{id}", getUser)
  .endGroup();

const oas = OpenApiV311(info).addPaths(path);

// Write OAS Spec
oas.writeOAS();
