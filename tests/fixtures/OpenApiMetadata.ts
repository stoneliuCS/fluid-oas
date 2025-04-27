/* Testing File for Metadata Fixtures.
 * One of the neat things about an immutable architecture is
 * that it makes testing with fixtures really easy.
 */

import { OpenApiPath } from "../../src/core/OpenApiPath";

export const HEALTHCHECK_ROUTE: OpenApiPath = OpenApiPath.create("/healthcheck")
  // Add Descriptions and summary for the route.
  .addDescription("Pings the server to get the current health.")
  .addSummary("Healthcheck server.")

  // Add the GET Operation for this route.
  .addOperation("GET")

  // Add a 200 Response for this GET.
  .addResponse("200")
  .addDescription("Successful Response")
  .addContent("application/json")
  .endResponse()

  // Add a 500 Response for this GET.
  .addResponse("500")
  .addDescription("Internal Server Error")
  .addContent("application/json")
  .endResponse()

  .endOperation();
