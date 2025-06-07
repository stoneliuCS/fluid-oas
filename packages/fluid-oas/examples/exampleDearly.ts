// An example of the creation of the Dearly API in FLUID-OAS

import {
  Array,
  Component,
  Info,
  MediaType,
  Object,
  OpenApiV3,
  Operation,
  Parameter,
  Path,
  PathItem,
  RequestBody,
  SecurityScheme,
  String,
} from "../src";

const dearlyInfo = Info.addTitle("Dearly API")
  .addVersion("1.0.0")
  .addDescription(
    "Dearly is a private family-sharing app that bridges generational gaps and makes staying connected easier and more meaningful. The platform allows families to share photos, voice memos, and other media in a secure, invite-only space. With two thoughtfully designed modes, Dearly caters to every generation: a streamlined, user-friendly interface for those less familiar with technology and a dynamic, feature-rich experience for younger users."
  )
  .addSummary("Dearly makes connecting with loved ones easy.");

// Create Bearer Security Scheme
const bearerSecurityScheme = SecurityScheme.addType("http")
  .addScheme("bearer")
  .addBearerFormat("JWT");

// Reusable schemas

const errorSchema = Object.addProperties({
  error: String,
}).addRequired(["error"]);

const validationSchema = Object.addProperties({
  message: String,
  errors: Array.addItems(
    Object.addProperties({ path: String, message: String })
  ),
}).addRequired(["path", "message"]);

const uuidSchema = String.addDescription("UUID Property").addFormat("uuid");

const userSchema = Object.addProperties({
  name: String,
  username: String,
  id: uuidSchema,
});

const dearlyComponents = Component.addSecuritySchemes({
  BearerAuth: bearerSecurityScheme,
}).addSchemas({
  Error: errorSchema,
  Validation: validationSchema,
  User: userSchema,
});

// Create convenient mappings for further use.
const mappings = dearlyComponents.createMappings();

// Create a path
const paths = Path.addEndpoints({
  "/users/{id}": PathItem.addParameters([
    Parameter.schema.addIn("query").addSchema(mappings.get(uuidSchema)!),
  ]).addMethod({
    get: Operation.addTags(["User Endpoints"]).addRequestBody(
      RequestBody.addContents({
        "application/json": MediaType.addSchema(mappings.get(userSchema)!),
      })
    ),
    put: Operation.addTags(["User Endpoints"]).addRequestBody(
      RequestBody.addContents({
        "application/json": MediaType.addSchema(
          Object.addProperties({
            name: String,
            description: String,
          })
        ),
      })
    ),
  }),
});

// Can also leverage common features to write less code
const UserOperations = Operation.addTags(["User Endpoints"]).addDescription(
  "Shared User Endpoints"
);

const cleanerPaths = Path.addEndpoints({
  "/users/{id}": PathItem.addParameters([
    Parameter.schema.addIn("query").addSchema(mappings.get(uuidSchema)!),
  ]).addMethod({
    get: UserOperations.addRequestBody(
      RequestBody.addContents({
        "application/json": MediaType.addSchema(mappings.get(userSchema)!),
      })
    ),
    put: UserOperations.addRequestBody(
      RequestBody.addContents({
        "application/json": MediaType.addSchema(
          Object.addProperties({
            name: String,
            description: String,
          })
        ),
      })
    ),
  }),
});

OpenApiV3.addOpenApiVersion("3.1.1")
  .addInfo(dearlyInfo)
  .addComponents(dearlyComponents)
  .addPaths(cleanerPaths)
  .writeOASSync();
