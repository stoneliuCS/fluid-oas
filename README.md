# S.A.L.T

Structured Application Programming Interface Language using TypeScript.

1. [Overview](#overview)
2. [Schema Design](#schemas)
   - [Primitives](#primitive-data-types)
   - [Objects](#objects)

## Overview

S.A.L.T is an embedded, functional _domain specific language_ for expressing type-safe HTTP APIs written in TypeScript through the OpenAPI specification.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want.
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.

## Goals

Normal OAS _DSLs_ either make the developers write decorators or objects that end up to be very similar to writing JSON. This library takes it one step further by introducing _compile-time_ protections when writing specifications and also additionally abstracts over the entire specification through Objects.

## Features

- _Extensible_, the core architecture revolves around chaining methods on OAS specifications to better easily write, maintain, and modularize specifications. Under the hood, SALT leverges the TypeScript compiler to code-gen _Mixins_ to extend onto base class specifications. If there is a field missing or something that you want to utilize, it can be done with the _FunctionBuilder_ API.

- _Great Development Experience_, write the least amount of code to express any OAS your team would like, all with help from the TypeScript Compiler.

## Schemas

### Primitive Data types

The OAS 3.0.0 _OpenAPI Specification_ defines the following primitive data types:

- [number](#defining-a-number)
- [integer](#defining-a-integer)
- [string](#defining-a-string)
- [boolean](#defining-a-boolean)

#### Number

```ts
Number()
  .description("I am a OpenAPI Number!")
  .format("double")
  .default(1)
  .min(0.5)
  .max(2.5)
  .exclusiveMin();
```

```json
{
  "type": "number",
  "description": "I am a OpenAPI Number!",
  "default": 1.5,
  "minimum": 0.5,
  "maximum": 2.5,
  "exclusiveMinimum": true,
  "format": "double"
}
```

#### Integer

```ts
Integer()
  .description("I am a OpenAPI Integer!")
  .format("int64")
  .default(1)
  .min(0)
  .max(99)
  .exclusiveMax();
```

```json
{
  "type": "integer",
  "description": "I am a OpenAPI Integer!",
  "default": 2,
  "minimum": 0,
  "maximum": 99,
  "exclusiveMaximum": true,
  "format": "int64"
}
```

#### Defining a String

```ts
String()
  .description("Unique identifier")
  .default("1238971891792")
  .format("uuid")
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  )
  .maxLength(0)
  .minLength(9)
  .toJSON();
```

```json
{
  "description": "Unique identifier",
  "format": "uuid",
  "minLength": 9,
  "maxLength": 0,
  "pattern": "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$",
  "default": "1238971891792",
  "type": "string"
}
```

#### Defining a Boolean

```ts
Boolean().description("I am a OpenAPI boolean!").default(false).nullable();
```

```json
{
  "type": "boolean",
  "description": "I am a OpenAPI boolean!",
  "nullable": true,
  "default": false
}
```

#### Objects

Chain the `property` method on `OpenApiObject` to fluidly build complex API Schemas:

```ts
const uuidSchema = String()
  .format("uuid")
  .example(Example().value("5e91507e-5630-4efd-9fd4-799178870b10"))
  .description("Id of the user.")
  .pattern(/stone/)
  .default("uuid");

const nameSchema = String()
  .minLength(1)
  .maxLength(10)
  .description("Name Schema.");

const user = Object()
  .property("firstName")
  .with(nameSchema)
  .property("id")
  .with(uuidSchema)
  .property("lastName")
  .with(nameSchema);
```

```json
{
  "properties": {
    "firstName": {
      "description": "Name Schema.",
      "minLength": 1,
      "maxLength": 10,
      "type": "string"
    },
    "id": {
      "description": "Id of the user.",
      "example": {
        "value": "5e91507e-5630-4efd-9fd4-799178870b10"
      },
      "format": "uuid",
      "pattern": "stone",
      "default": "uuid",
      "type": "string"
    },
    "lastName": {
      "description": "Name Schema.",
      "minLength": 1,
      "maxLength": 10,
      "type": "string"
    }
  },
  "type": "object"
}
```

## Paths

Modularize the way you write your API endpoints. Define _PathItems_ and _Schemas_, composing them to create
complex API endpoints.

```ts
const stringSchema = String().minLength(1).maxLength(100);

const userSchema = Object()
  .property("name")
  .with(stringSchema.description("Name of the user"))
  .property("username")
  .with(stringSchema.description("The username of the user"))
  .property("mode")
  .with(
    String()
      .enum("BASIC", "ADVANCED", null)
      .description("Mode of the user.")
      .nullable()
  )
  .property("profilePhoto")
  .with(String().nullable().description("A URL to the user's profile photo."))
  .required("username")
  .additionalProperties();

const healthCheckPath = PathItem()
  .method("get")
  .with(
    Operation()
      .tags("HealthCheck")
      .summary("Health Check Endpoint")
      .description("Pings the server to check the health of the current server")
      .response("200")
      .with(
        Response("Success!")
          .content("application/json")
          .with(
            MediaType().schema(
              Object().property("message").with(String().enum("OK"))
            )
          )
      )
  );

const userPostOperation = Operation()
  .tags("user")
  .summary("Creates a User")
  .description(
    "Creates a user from the specified body (with ID being the decoded ID from JWT)."
  )
  .security(SecurityRequirement().field("BearerAuth").with())
  .requestBody(
    RequestBody("application/json").with(MediaType().schema(userSchema))
  );

const userPath = PathItem().method("post").with(userPostOperation);

const paths = Path()
  .endpoint("/healthcheck")
  .with(healthCheckPath)
  .beginGroup("/api/v1") // Everything inside the beginGroup clause will be prefixed with /api/v1
  .endpoint("/users")
  .with(userPath)
  .endGroup();
```

```json
{
  "/healthcheck": {
    "get": {
      "200": {
        "description": "Success!",
        "application/json": {
          "schema": {
            "properties": {
              "message": {
                "enum": ["OK"],
                "type": "string"
              }
            },
            "type": "object"
          }
        }
      },
      "tags": ["HealthCheck"],
      "summary": "Health Check Endpoint",
      "description": "Pings the server to check the health of the current server"
    }
  },
  "/api/v1/users": {
    "post": {
      "tags": ["user"],
      "summary": "Creates a User",
      "description": "Creates a user from the specified body (with ID being the decoded ID from JWT).",
      "requestBody": {
        "application/json": {
          "schema": {
            "properties": {
              "name": {
                "description": "Name of the user",
                "minLength": 1,
                "maxLength": 100,
                "type": "string"
              },
              "username": {
                "description": "The username of the user",
                "minLength": 1,
                "maxLength": 100,
                "type": "string"
              },
              "mode": {
                "description": "Mode of the user.",
                "nullable": true,
                "enum": ["BASIC", "ADVANCED", null],
                "type": "string"
              },
              "profilePhoto": {
                "description": "A URL to the user's profile photo.",
                "nullable": true,
                "type": "string"
              }
            },
            "required": ["username"],
            "additionalProperties": true,
            "type": "object"
          }
        }
      },
      "security": [
        {
          "BearerAuth": []
        }
      ]
    }
  }
}
```
