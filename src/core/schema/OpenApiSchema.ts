import type { OpenApiSpecificationProperty } from "../types/OpenApi";

class _OpenApiSchema implements OpenApiSpecificationProperty<_OpenApiSchema> {
    toJSON(): unknown {
        throw new Error("Method not implemented.");
    }
    extend(name: string, schema: OpenApiSchema): _OpenApiSchema {
        throw new Error("Method not implemented.");
    }
}

export type OpenApiSchema = _OpenApiSchema;
