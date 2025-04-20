/* Testing File for Metadata Fixtures.
 * One of the neat things about an immutable architecture is
 * that it makes testing with fixtures really easy.
 */

import { OpenApiMetadata } from "../../src/core/OpenApiMetadata";

export const emptyMetadata: OpenApiMetadata = new OpenApiMetadata();
