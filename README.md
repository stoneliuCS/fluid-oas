# S.A.L.T

Structured Application Programming Interface Language for TypeScript.

1. [Overview](#overview)
2. [Schema Design](#schemas)
   - [Primitives](#primitive-data-types)

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

#### Defining a Number

```ts
OpenApiNumber.description("I am a OpenAPI Number!")
  .default(1.5)
  .format("double")
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

#### Defining a Integer

```ts
OpenApiInteger.description("I am a OpenAPI Integer!")
  .default(2)
  .format("int64")
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
OpenApiString.description("Unique identifier")
  .format("uuid")
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  )
  .example("643ad75f-0514-49f1-a68e-18a87ba017f0");
```

```json
{
  "type": "string",
  "description": "Unique identifier",
  "example": "643ad75f-0514-49f1-a68e-18a87ba017f0",
  "format": "uuid",
  "pattern": "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$"
}
```

#### Defining a Boolean

```ts
OpenApiBoolean.description("I am a OpenAPI boolean!")
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
