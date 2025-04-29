import { OpenApiInfo } from "../core/OpenApiInfo";
import { OpenApiMetadata } from "../core/OpenApiMetadata";

/* DEFINE OPENAPI INFO OBJECT */
let openapiInfo = OpenApiInfo.create("Pet Store", "1.0.0");

/* Add Contant Info */
openapiInfo = openapiInfo
  .addContact()
  .addEmail("Sample Email")
  .addUrl("Sample Url")
  .addName("Sample Name")
  .endContact();

/* Add Summary */
openapiInfo = openapiInfo.addSummary("Sample Summary");

/* Add Description */
openapiInfo = openapiInfo.addDescription("Sample Description");

/* Add Terms of Service */
openapiInfo = openapiInfo.addTermsOfService("Sample Terms Of Service");

/* Add License */
openapiInfo = openapiInfo
  .addLicense("Sample License")
  .addIdentifier("Sample Identifier")
  .addUrl("Sample Url")
  .endLicense();

const metadata =  OpenApiMetadata.create("3.1.1", openapiInfo);

metadata.toOpenApiSpecification()
