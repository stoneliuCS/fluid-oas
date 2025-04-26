# S.A.L.T

Structured Application Programming Interface Language for TypeScript.

## Overview

S.A.L.T is an embedded _domain specific language_ for expressing type-safe REST APIs written in TypeScript through the OpenAPI specification.

The key features of SALT is an entirely type-safe, functional and fluid API to express an OpenAPI specification in TypeScript.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want. 
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.
- Build the specification through human-readable functional method chains, giving step by step assistance in creating the specification with the help of the TypeScript LSP.

This simple example defines a way to build a health check route.
```ts
export const HEALTHCHECK_ROUTE: OpenApiRoute = OpenApiRoute.create(
  "/healthcheck",
)
  // Add Descriptions and summary for the route.
  .addDescription("Pings the server to get the current health.")
  .addSummary("Healthcheck server.")

  // Add the GET Operation for this route.
  .addOperation("GET")

  // Add a 200 Response for this GET.
  .addResponse("200")
  .addDescription("Successful Response")
  .addContent("application/json")
  .addSchema(HEALTHCHECK_RESPONSE_SCHEMA)
  .endResponse()

  // Add a 500 Response for this GET.
  .addResponse("500")
  .addDescription("Internal Server Error")
  .addContent("application/json")
  .addSchema(HEALTHCHECK_ERROR_SCHEMA)
  .endResponse()

  .endOperation();
```
