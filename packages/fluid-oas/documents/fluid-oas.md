`fluid-oas` is a functional, domain specific language for creating OpenAPI Specifications in TypeScript.

Installation

With npm:

```bash
npm install fluid-oas --save-dev
```

With Bun:

```bash
bun add --development fluid-oas
```

Build maintainable OpenAPI specifications easily:
```ts
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
      .addDescription("Unique Identifier.")
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
      MediaType().addSchema(userSchema)
    )
  )
  .addResponse(
    "401",
    Response("Unauthorized").addContent(
      "application/json",
      MediaType().addSchema(errorSchema)
    )
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
    .addResponses(getUserResponses)
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

Which will automatically generate:

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


