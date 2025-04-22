# S.A.L.T
A Structured Application Programming Interface Language for TypeScript APIs

## Purpose
S.A.L.T is an internal/embedded Domain Specific Language for expressing type-safe web APIs written in TypeScript through the OpenAPI specification.

The key features of SALT is an entirely type-safe, functional API to express an OpenAPI specification in TypeScript.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want. Focus on business logic, have the interface logic abstracted away through 1 to 1 TypeScript type and validator generation.
- Write the controllers you want, no frameworks to dictate how to write your APIs or controllers.

Defining a complete API specification is made easy, it reads like english:
```ts
let metadata = new OpenApiMetadata();
// Define the healthcheck endpoint in a completely object oriented fashion
const healthcheck = new OpenApiRoute("/api/v1/healthcheck")
  .addGetOperation()

  .addResponse(OpenApiStatusCode.OK, "Ping the health of the server.")
  .addContentType(OpenApiContentType.JSON)
  .addSchema(new OpenApiSchema())

  .addResponse(OpenApiStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
  .addContentType(OpenApiContentType.JSON)
  .addSchema(new OpenApiSchema())
  .return();

metadata = metadata
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(healthcheck);

const openapi = new OpenApiBuilder(metadata);

openapi.toOpenApi()
```
