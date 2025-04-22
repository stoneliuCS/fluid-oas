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
// Define Schemas for your OpenAPI specification:
const userEndpoint = new OpenApiRoute("/users/{id}")
  // Adds the Parameter to the OpenApiRoute path
  .addOperation("GET")
  .addParameter("id")
  .addLocation("path")
  .additionalMetadata()

  // Adds the reponse to the OpenApiRoute path
  .addResponse("200")
  .addDescription("Successfully gotten user")
  .addHeaders() // Add additional headers if needed, or leave it blank.
  .addContentType(OpenApiContentType.JSON)
  .addSchema(successResponse)
  .additionalMetadata() // Add additional metadata like examples if needed or leave it blank.

  // Adds the reponse to the OpenApiRoute path
  .addResponse("500")
  .addDescription("Internal Server Error")
  .addHeaders()
  .addContentType(OpenApiContentType.JSON)
  .addSchema(errorResponse)
  .additionalMetadata()
  // Finish the route
  .return()

const metadata = new OpenApiMetadata()
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(userEndpoint);

const openapi = new OpenApiBuilder(metadata);

openapi.toOpenApi();
```
