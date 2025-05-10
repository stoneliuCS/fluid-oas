import { OpenApiDocumentation } from "../common/OpenApiDocumentation";

const something1 = OpenApiDocumentation.description("Hey buddy");
const something = something1.url("hey url").toJSON();
console.log(something1.toJSON());
