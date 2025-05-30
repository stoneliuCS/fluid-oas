# User Guide

In this example we will introduce an example project that wants to create a OpenApiV3_1_1 specification.

First create an OpenAPIv3_1_1 object

```ts
import { OpenApiV3_1_1 } from "fluid-oas";
```

```ts
// Add required info metadata
const info = Info("Example Info", "v1.0.0");
const oas = OpenApiV3_1_1(info);
```

Create a path object and add a endpoint for user creations.

```ts
const paths = Path()
  .beginGroup("/api/v1")
  .addEndpoints({ "/users": createUserPathItem })
  .endGroup();
```

Next add relevant schemas that can be reused across your specification.

```ts
const userSchema = Object({
  name: String(),
  username: String().addMinLength(1).addMaxLength(100),
  profilePhoto: String(),
}).addRequired(["username"]);

const errorSchema = Object({
  error: String(),
}).addRequired(["error"]);
```

Finally add the proper responses from your endpoint.

```ts
const createUserPathItem = PathItem().addMethod({
  post: Operation().addResponses(
    Responses({
      "201": Response("Successfully Created User").addContents({
        "application/json": MediaType().addSchema(userSchema),
      }),
      "400": Response("Bad Request").addContents({
        "application/json": MediaType().addSchema(errorSchema),
      }),
      "401": Response("Unauthorized").addContents({
        "application/json": MediaType().addSchema(errorSchema),
      }),
      "403": Response("Forbidden").addContents({
        "application/json": MediaType().addSchema(errorSchema),
      }),
      "500": Response("Internal Server Error").addContents({
        "application/json": MediaType().addSchema(errorSchema),
      }),
    })
  ),
});
```

Finally create your OpenAPI Specification

```ts
const oas = OpenApiV3_1_1(info).addPaths(paths);
oas.writeOAS();
```

```json
{
  "openapi": "3.1.1",
  "info": {
    "title": "Example Info",
    "version": "v1.0.0"
  },
  "paths": {
    "/api/v1/users": {
      "post": {
        "responses": {
          "201": {
            "description": "Successfully Created User",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "username": {
                      "minLength": 1,
                      "maxLength": 100,
                      "type": "string"
                    },
                    "profilePhoto": {
                      "type": "string"
                    }
                  },
                  "required": ["username"],
                  "type": "object"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["error"],
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
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["error"],
                  "type": "object"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["error"],
                  "type": "object"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["error"],
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

Just like that you can create super maintainable specifications, modularize your API documentation, reuse schemas and get TypeScript intellisense aswell!
