# S.A.L.T

Structured Application Programming Interface Language using TypeScript.

1. [Overview](#overview)
2. [Schema Design](#schemas)
   - [Primitives](#primitive-data-types)
   - [Objects](#objects)

## Overview

S.A.L.T is an embedded, functional _domain specific language_ for expressing type-safe REST APIs written in TypeScript through the OpenAPI specification.

- No dependencies, use as is.
- Write the most complex OpenAPI specification you want, use whatever framework you want.
- Focus on core business logic, design systems in an _API-first manner_.
- Leverage TypeScript's advanced type-system to get autocomplete and compile-time checks for building your OpenAPI specification.

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
Boolean()
  .description("I am a OpenAPI boolean!")
  .default(false)
  .nullable();
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
const Pet = OpenApiObject()
  .property("id")
  .schema(OpenApiInteger().format("int64").example("10"))
  .property("name")
  .schema(OpenApiString().example("doggie"))
  .property("category")
  .schema(
    OpenApiObject()
      .property("id")
      .schema(OpenApiInteger().format("int64"))
      .property("name")
      .schema(OpenApiString().example("dogs"))
  )
  .property("photoUrls")
  .schema(OpenApiArray(OpenApiArray(OpenApiString())))
  .property("tags")
  .schema(
    OpenApiObject()
      .property("id")
      .schema(OpenApiInteger().format("int64"))
      .property("name")
      .schema(OpenApiString())
  )
  .property("status")
  .schema(
    OpenApiString()
      .enum("available")
      .enum("pending")
      .enum("sold")
      .description("pet status in the store.")
  );
```

```json
{
  "type": "object",
  "properties": {
    "id": {
      "example": "10",
      "format": "int64",
      "type": "integer"
    },
    "name": {
      "example": "doggie",
      "type": "string"
    },
    "category": {
      "type": "object",
      "properties": {
        "id": {
          "format": "int64",
          "type": "integer"
        },
        "name": {
          "example": "dogs",
          "type": "string"
        }
      }
    },
    "photoUrls": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "tags": {
      "type": "object",
      "properties": {
        "id": {
          "format": "int64",
          "type": "integer"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "status": {
      "description": "pet status in the store.",
      "enum": ["available", "pending", "sold"],
      "type": "string"
    }
  }
}
```
