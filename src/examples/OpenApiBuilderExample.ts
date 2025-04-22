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

const userEndpoint = new OpenApiRoute("/users/{id}")
  // Adds the Parameter to the OpenApiRoute path
  .addOperation("GET")
  .addParameter("id")
  .addLocation("path")
  .additionalMetadata()

  // Adds the reponse to the OpenApiRoute path
  .addResponse("200")
  .addDescription("Successfully gotten user")
  .addHeaders() // Add additional headers if needed, or leave it blank.
  .addContentType(OpenApiContentType.JSON)
  .addSchema(successResponse)
  .additionalMetadata() // Add additional metadata like examples if needed or leave it blank.

  // Adds the reponse to the OpenApiRoute path
  .addResponse("500")
  .addDescription("Internal Server Error")
  .addHeaders()
  .addContentType(OpenApiContentType.JSON)
  .addSchema(errorResponse)
  .additionalMetadata()
  // Finish the route
  .return()

const metadata = new OpenApiMetadata()
  .addVersion("3.0.0")
  .addInfo({ title: "PetStore", version: "1.0.0" })
  .addRoute(userEndpoint);

const openapi = new OpenApiBuilder(metadata);

openapi.toOpenApi();
