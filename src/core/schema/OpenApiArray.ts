import type { OpenApiDocumentation } from "../OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";
import { OpenApiSchema } from "./OpenApiSchema";

class OpenApiSchemaArray extends OpenApiSchema {
    public xml(xml: OpenApiXML): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public externalDocs(docs: OpenApiDocumentation): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public example(example: OpenApiExample): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public description(description: string): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public nullable(): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public default(defaultVal: unknown): OpenApiSchema {
        throw new Error("Method not implemented.");
    }
    public toJSON(): unknown {
        throw new Error("Method not implemented.");
    }
}
