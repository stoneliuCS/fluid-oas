import {
  Example,
  Info,
  Object,
  Number,
  Boolean,
  Array,
  Operation,
  Parameter,
  Path,
  PathItem,
  Response,
  Responses,
  MediaType,
  String,
  OpenApiV3,
  Union,
  Null,
  Contact,
  Integer,
  Component,
} from "../src/";

const info = Info.addTitle("My API")
  .addVersion("1.0.0")
  .addDescription("Example description.")
  .addSummary("Example Summary")
  .addContact(
    // Add contact information if needed.
    Contact.addEmail("youremail@blah.com")
      .addName("Your Name.")
      .addUrl("https://domain.com")
  );

// Example schemas
const nameSchema = Union(
  String.addMinLength(1)
    .addMaxLength(10)
    .addExample(Example.addValue("John"))
    .addDescription("Name of the person."),
  Null
);

const uuidSchema = String.addFormat("uuid")
  .addExample("5e91507e-5630-4efd-9fd4-799178870b10") // Examples are supported but are deprecated as of 3.0.0
  .addDescription("Unique identifer");

const userSchema = Object.addProperties({
  firstName: nameSchema,
  lastName: nameSchema,
  id: uuidSchema,
}).addRequired(["id"]); // id is required an should match the id key in the Object.

const errorSchema = Object.addProperties({
  message: String.addReadOnly(true),
});

const components = Component.addSchemas({
  UserSchema: userSchema,
  ErrorSchema: errorSchema,
  uuidSchema: uuidSchema,
});

const componentMappings = components.createMappings();

const getUserResponses = Responses.addResponses({
  200: Response.addDescription("Successfully Retrieved User!").addContents({
    "application/json": MediaType.addSchema(componentMappings.get(userSchema)!),
  }),
  401: Response.addDescription("Failed to retrieve user!").addContents({
    "application/json": MediaType.addSchema(
      componentMappings.get(errorSchema)!
    ),
  }),
});

// Declare Path Items
const getUser = PathItem.addMethod({
  get: Operation.addParameters([
    Parameter.schema
      .addName("id")
      .addIn("path")
      .addRequired(true)
      .addSchema(componentMappings.get(uuidSchema)!),
  ]).addResponses(getUserResponses),
});

// Register Paths
const path = Path.beginGroup("/api/v1")
  .addEndpoints({ "/user/{id}": getUser })
  .endGroup();

const oas = OpenApiV3.addOpenApiVersion("3.1.1")
  .addInfo(info)
  .addPaths(path)
  .addComponents(components);

// Write OAS Spec
oas.writeOASSync();

// PRIMITIVE SCHEMAS
Number.addDescription("I am a OpenAPI Number!")
  .addFormat("double")
  .addDefault(1)
  .addMinimum(0.5)
  .addMaximum(2.5)
  .addExclusiveMin(1);

Integer.addDescription("I am a OpenAPI Number!")
  .addFormat("int32")
  .addDefault(1)
  .addMinimum(0.5)
  .addMaximum(2.5)
  .addExclusiveMin(1);

String.addDescription("I am an OpenApi String!")
  .addDefault("OAS!")
  .addMinLength(1)
  .addMaxLength(4)
  .addPattern(/something/);

Boolean.addDescription("I am a OpenAPI boolean!")
  .addDefault(false)
  .addExample(true);

Object.addProperties({
  firstName: String,
  lastName: String,
  id: String,
});

Array.addItems(String)
  .addMinItems(1)
  .addMaxItems(10)
  .addDefault(["defaultVal"]);
