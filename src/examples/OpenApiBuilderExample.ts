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

const userEndpoint = OpenApiRoute.create("/user/{id}")
  // Adds the Parameters available to the entire OpenApiRoute path
  .addParameter("id")
  .addIn("path")
  .endParameter()

  .addOperation("GET")
  .addResponse("200")
  .addDescription("Get all users")
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

const metadata = OpenApiMetadata.create()
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(userEndpoint);

const openapi = new OpenApiBuilder(metadata);

openapi.toOpenApi();
