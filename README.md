# S.A.L.T

Structured Application Programming Interface Language for TypeScript.

## Overview

S.A.L.T is an embedded _domain specific language_ for expressing type-safe REST APIs written in TypeScript through the OpenAPI specification.

The key features of SALT is an entirely type-safe, functional and fluid API to express an OpenAPI specification in TypeScript.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want.
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.
- Build the specification through human-readable functional method chains, getting step by step assistance from the TypeScript compiler.
- Extensible, add custom visitors to extend your own use cases for the OpenAPI object, including custom code generation, schema generation, and type generation.

This simple example defines a way to build a health check route.

```ts
const userSchema = OpenApiObject.description("User Schema")
  .properties({
    name: OpenApiString.min(1).description("Display name of the user."),
    username: OpenApiString.min(1).description("The username of the user."),
    id: OpenApiString.format("uuid")
      .example("5e91507e-5630-4efd-9fd4-799178870b10")
      .description("Unique identifier for the user."),
    mode: OpenApiString.enum("BASIC", "ADVANCED", null).description(
      "Mode for the user.",
    ),
    profilePhoto: OpenApiString.nullable().description(
      "A URL to the users profile photo.",
    ),
    bio: OpenApiString.nullable().description("A bio for the users profile."),
    birthday: OpenApiString.nullable()
      .format("date")
      .description("Birthday of the user."),
    timezone: OpenApiString.nullable().description("Timezone for the user."),
    postCount: OpenApiInteger.nullable().description(
      "Number of posts for this user.",
    ),
  })
  .required("username", "mode");
```
