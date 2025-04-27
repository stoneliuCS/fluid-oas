import { OpenApiPath } from "../core/OpenApiPath";

// Define Schemas for your OpenAPI specification:

const userEndpoint = OpenApiPath.create("/user/{id}")

  .addDescription("User endpoint")

  .addParameter("id")
  .addIn("path")
  .endParameter()
  .addOperation("GET")
  .addResponse("200")
  .addDescription("Successful response")
  .addContent("application/json")
  .endResponse()

  .endOperation()
