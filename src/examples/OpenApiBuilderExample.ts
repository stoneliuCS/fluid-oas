import { OpenApiBuilder } from "../core/OpenApiBuilder";
import { OpenApiSchema } from "../core/OpenApiSchema";
import { OpenApiMetadata } from "../core/OpenApiMetadata";
import { OpenApiRoute } from "../core/OpenApiRoute";
import { OpenApiContentType, OpenApiSchemaType } from "../types/OpenApiTypes";

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
  // Adds the Parameter to the OpenApiRoute path
  .addParameter("id")
  .addIn("path")
  .endParameter()
  .addOperation("GET")
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
