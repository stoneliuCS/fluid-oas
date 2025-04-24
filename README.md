# S.A.L.T

A Structured Application Programming Interface Language for TypeScript APIs

## Purpose

S.A.L.T is an internal/embedded Domain Specific Language for expressing type-safe web APIs written in TypeScript through the OpenAPI specification.

The key features of SALT is an entirely type-safe, functional API to express an OpenAPI specification in TypeScript.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want. Focus on business logic, have the interface logic abstracted away through 1 to 1 TypeScript type and validator generation.
- Write the controllers you want, no frameworks to dictate how to write your APIs or controllers.


Leveraging TypeScript type system, one can chain method calls and use the power of the TypeScript LSP to quickly create easily readable API endpoints with ease!
```ts
// Define Schemas for your OpenAPI specification:
const successResponse = new OpenApiSchema(
  "SuccessResponse",
  OpenApiSchemaType.OBJECT,
);

const errorResponse = new OpenApiSchema(
  "ErrorResponse",
  OpenApiSchemaType.OBJECT,
);

const rateLimitHeader = new OpenApiSchema(
  "RateLimitHeader",
  OpenApiSchemaType.OBJECT,
);

const userEndpoint = new OpenApiRoute("/user/{id}")
  // Adds the Parameters available to the entire OpenApiRoute path
  .addParameter("id")
  .addIn("path")
  .endParameter()
  .addOperation("GET")
  // Can Override these parameters specifically for the GET Operation
  .addParameter("id")
  .addIn("path")
  .endParameter()
  // Add a 200 response with a custom header.
  .addResponse("200")
  .addDescription("Get all users")
  .addHeader("X-Rate-Limit")
  .addHeaderObject({
    description: "Rate limits on users",
    schema: rateLimitHeader,
  })
  .addContent(OpenApiContentType.JSON)
  .addSchema(successResponse)
  .endResponse()

  // Add a 401 Response
  .addResponse("401")
  .addDescription("Unauthorized")
  .addContent(OpenApiContentType.JSON)
  .addSchema(errorResponse)
  .endResponse()

  // Add a 403 Response
  .addResponse("403")
  .addDescription("Forbidden")
  .addContent(OpenApiContentType.JSON)
  .addSchema(errorResponse)
  .endResponse()

  // Add a 500 Response
  .addResponse("500")
  .addDescription("Internal Server Error")
  .addContent(OpenApiContentType.JSON)
  .addSchema(errorResponse)
  .endResponse()

  .return();

const metadata = new OpenApiMetadata()
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(userEndpoint);

const openapi = new OpenApiBuilder(metadata);

openapi.toOpenApi();
```
