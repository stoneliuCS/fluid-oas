import {
  Array,
  Example,
  Info,
  Object,
  Operation,
  Parameter,
  Path,
  PathItem,
  Response,
  Responses,
  MediaType,
  String,
  OpenApiV3_1_1,
} from "../src/";

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

console.log(
  Array(String())
    .addMinItems(1)
    .addMaxItems(10)
    .addDescription("Example of a string array.")
    .toJSON()
);

const userSchema = Object().addProperties({
  firstName: nameSchema,
  lastName: nameSchema,
  id: uuidSchema,
});

const getUserResponses = Responses().addResponses({
  "200": Response("Successfully Retrieved User!").addContents({
    "application/json": MediaType().addSchema(userSchema),
  }),
});

// Declare Path Items
const getUser = PathItem().addMethod({
  get: Operation()
    .addParameters([
      Parameter("schema")
        .addName("id")
        .addIn("path")
        .required()
        .addSchema(uuidSchema),
    ])
    .addResponses(getUserResponses),
});

// Register Paths
const path = Path()
  .beginGroup("/api/v1")
  .addEndpoints({ "/user/{id}": getUser })
  .endGroup();

const oas = OpenApiV3_1_1(info).addPaths(path);

// Write OAS Spec
oas.writeOAS();
