# Fluid-OAS

Declaratively build _type-safe_ **HTTP APIs** in TypeScript through the **OpenAPI** specification. 

## Installation

With NPM:
```bash
npm install fluid-oas --save-dev
```

With Bun:
```bash
bun add --development fluid-oas
```
1. [Overview](#overview)
   - [Example Usage](#example-usage)
2. [Schema Design](#schemas)
   - [Primitives](#primitive-data-types)
   - [Objects](#objects)

## Overview

_Fluid-OAS_ is an embedded, completely functional _domain specific language_ for expressing type-safe HTTP APIs written in TypeScript through the OpenAPI specification.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want.
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.
- Significantly reduce the amount of boilerplate JSON your team has to write.

### Example Usage
```ts
import {
  Info,
  String,
  Example,
  Responses,
  Response,
  MediaType,
  Path,
  Parameter,
  Operation,
  PathItem,
} from "fluid-oas";
import { OpenApiV311 } from "fluid-oas/dist/core/openapiv3";

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
      .addDescription("Unique Identifier."),
  );

const userSchema = Object()
  .addProperty("firstName", nameSchema)
  .addProperty("lastName", nameSchema)
  .addProperty("id", uuidSchema);

const errorSchema = Object().addProperty("message", String());

const getUserResponses = Responses()
  .addResponse(
    "200",
    Response("Successfully Retrieved User!").addContent(
      "application/json",
      MediaType().addSchema(userSchema),
    ),
  )
  .addResponse(
    "401",
    Response("Unauthorized").addContent(
      "application/json",
      MediaType().addSchema(errorSchema),
    ),
  );

// Declare Path Items
const getUser = PathItem().addMethod(
  "get",
  Operation()
    .addParameters([
      Parameter("schema")
        .addName("id")
        .addIn("path")
        .required()
        .addSchema(uuidSchema),
    ])
    .addResponses(getUserResponses),
);

// Register Paths
const path = Path()
  .beginGroup("/api/v1")
  .addEndpoint("/user/{id}", getUser)
  .endGroup();

const oas = OpenApiV311(info).addPaths(path);

// Write OAS Spec
oas.writeOAS();
```

```json
{
  "openapi": "3.1.1",
  "info": {
    "summary": "Get autocomplete and typescript typechecking too!",
    "description": "Add an example description",
    "title": "My API",
    "version": "v1.0.0"
  },
  "paths": {
    "/api/v1/user/{id}": {
      "get": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "example": {
                "description": "Unique Identifier.",
                "value": "5e91507e-5630-4efd-9fd4-799178870b10"
              },
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully Retrieved User!",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "firstName": {
                      "description": "Name of the person.",
                      "example": {
                        "value": "John"
                      },
                      "minLength": 1,
                      "maxLength": 10,
                      "type": "string"
                    },
                    "lastName": {
                      "description": "Name of the person.",
                      "example": {
                        "value": "John"
                      },
                      "minLength": 1,
                      "maxLength": 10,
                      "type": "string"
                    },
                    "id": {
                      "example": {
                        "description": "Unique Identifier.",
                        "value": "5e91507e-5630-4efd-9fd4-799178870b10"
                      },
                      "format": "uuid",
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

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
