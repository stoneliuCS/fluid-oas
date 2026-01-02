# Fluid-OAS

Declaratively build _type-safe_ **HTTP APIs** in TypeScript through the **OpenAPI** specification.

## Installation

With npm:

```bash
npm install fluid-oas --save-dev
```

With Bun:

```bash
bun add --development fluid-oas
```

Visit the [docs](https://stoneliucs.github.io/fluid-oas/) here

1. [Overview](#overview)
   - [Example Usage](#example-usage)
2. [Schema Design](#schemas)
   - [Primitives](#primitive-data-types)
   - [Objects](#objects)
   - [Arrays](#arrays)

## Overview

_Fluid-OAS_ is an embedded, completely functional _domain specific language_ for expressing type-safe HTTP APIs written in TypeScript through the OpenAPI specification.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want.
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.
- Significantly reduce the amount of boilerplate JSON your team has to write.

### Example Usage

```ts
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

const getUserResponses = Responses({
  200: Response.addDescription("Successfully Retrieved User!").addContents({
    "application/json": MediaType.addSchema(userSchema),
  }),
  401: Response.addDescription("Failed to retrieve user!").addContents({
    "application/json": MediaType.addSchema(errorSchema),
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
```

```json
{
  "openapi": "3.1.1",
  "info": {
    "summary": "Example Summary",
    "description": "Example description.",
    "title": "My API",
    "version": "1.0.0",
    "contact": {
      "name": "Your Name.",
      "url": "https://domain.com",
      "email": "youremail@blah.com"
    }
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
              "description": "Unique identifer",
              "example": "5e91507e-5630-4efd-9fd4-799178870b10",
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
                      "type": ["string", "null"],
                      "description": "Name of the person.",
                      "example": {
                        "value": "John"
                      },
                      "minLength": 1,
                      "maxLength": 10
                    },
                    "lastName": {
                      "type": ["string", "null"],
                      "description": "Name of the person.",
                      "example": {
                        "value": "John"
                      },
                      "minLength": 1,
                      "maxLength": 10
                    },
                    "id": {
                      "description": "Unique identifer",
                      "example": "5e91507e-5630-4efd-9fd4-799178870b10",
                      "format": "uuid",
                      "type": "string"
                    }
                  },
                  "required": ["id"],
                  "type": "object"
                }
              }
            }
          },
          "401": {
            "description": "Failed to retrieve user!",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "readOnly": true,
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

All schemas are reflective of the latest [Json Schema](https://json-schema.org/understanding-json-schema/reference).

- [number](#defining-a-number)
- [integer](#defining-a-integer)
- [string](#defining-a-string)
- [boolean](#defining-a-boolean)

#### Number

```ts
Number.addDescription("I am a OpenAPI Number!")
  .addFormat("double")
  .addDefault(1)
  .addMinimum(0.5)
  .addMaximum(2.5)
  .addExclusiveMin(1);
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
Integer.addDescription("I am a OpenAPI Number!")
  .addFormat("int32")
  .addDefault(1)
  .addMinimum(0.5)
  .addMaximum(2.5)
  .addExclusiveMin(1);
```

#### Defining a String

```ts
String.addDescription("I am an OpenApi String!")
  .addDefault("OAS!")
  .addMinLength(1)
  .addMaxLength(4)
  .addPattern(/something/);
```

#### Defining a Boolean

```ts
Boolean.addDescription("I am a OpenAPI boolean!")
  .addDefault(false)
  .addExample(true);
```

### Objects

Declare properties and other metadata on OpenAPI `Object` with the `addProperties` method.

```ts
Object.addProperties({
  firstName: String,
  lastName: String,
  id: String,
});
```

### Arrays

Arrays can be typed with other schema types, see below for an example of a string array.

```ts
Array.addItems(String)
  .addMinItems(1)
  .addMaxItems(10)
  .addDefault(["defaultVal"]);
```
