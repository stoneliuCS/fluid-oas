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
  MediaType,
  String,
  OpenApiV3,
  Union,
  Null,
  Contact,
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
const nameSchema = Union.ofTypes(
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

const getUserResponses = Responses.addResponses({
  200: Response.addDescription("Successfully Retrieved User!").addContents({
    "application/json": MediaType.addSchema(userSchema),
  }),
});

// Declare Path Items
const getUser = PathItem.addMethod({
  get: Operation.addParameters([
    Parameter.schema
      .addName("id")
      .addIn("path")
      .addRequired(true)
      .addSchema(uuidSchema),
  ]).addResponses(getUserResponses),
});

// Register Paths
const path = Path.beginGroup("/api/v1")
  .addEndpoints({ "/user/{id}": getUser })
  .endGroup();

const oas = OpenApiV3.addOpenApiVersion("3.1.1").addInfo(info).addPaths(path);

// Write OAS Spec
oas.writeOASSync();
