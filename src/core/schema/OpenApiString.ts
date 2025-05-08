import type { OpenApiDocumentation } from "../common/OpenApiDocumentation";
import type { OpenApiXML } from "../common/OpenApiXML";
import type { OpenApiSchema } from "../types/OpenApi";

class OpenApiString implements OpenApiSchema {
  private constructor() {}
  toJSON(): unknown {
    throw new Error("Method not implemented.");
  }
  extend(name: string, schema: OpenApiSchema): OpenApiString {
    throw new Error("Method not implemented.");
  }
  xml(xml: OpenApiXML): OpenApiSchema {
    throw new Error("Method not implemented.");
  }
  externalDocs(externalDocs: OpenApiDocumentation): OpenApiString {
    throw new Error("Method not implemented.");
  }
}
