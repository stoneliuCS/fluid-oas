import { OpenApiSchema } from "../core/OpenApiSchema";
import { OpenApiPath } from "../core/OpenApiPath";
import { OpenApiMetadata } from "../core/OpenApiMetadata";

// Define Schemas for your OpenAPI specification:

const successResponse = new OpenApiSchema("SuccessResponse", "object");

const errorResponse = new OpenApiSchema("ErrorResponse", "object");

const userEndpoint = OpenApiPath.create("/user/{id}")

  .addDescription("User endpoint")

  .addParameter("id")
  .addIn("path")
  .endParameter()
  .addOperation("GET")
  .addResponse("200")
  .addDescription("Successful response")
  .addContent("application/json")
  .addSchema(successResponse)
  .endResponse()

  .endOperation()
