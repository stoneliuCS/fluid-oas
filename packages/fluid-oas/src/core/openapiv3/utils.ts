import {
  ReferenceObject,
  type __OpenApiComponent__,
  type OpenApiReferenceObject,
} from "./lib";
import type { OpenApiSchema } from "./schema";

/**
 * Utility function to create mappings between schemas and reference objects.
 * This makes it such that one can define their schemas upfront in the components object,
 * then grab their corresponding reference from the map object.
 * @param componentObject - OpenApiComponent Object.
 * @returns a mapping between schemas and reference objects.
 */
export function createSchemaToReferenceMapping(
  componentObject: __OpenApiComponent__
): Map<OpenApiSchema, OpenApiReferenceObject> {
  const mappings: Map<OpenApiSchema, OpenApiReferenceObject> = new Map();
  if (componentObject._schemas !== undefined) {
    for (const [key, val] of componentObject._schemas) {
      const reference = ReferenceObject.add$Ref(`#/components/schemas/${key}`);
      mappings.set(val, reference);
    }
  }
  return Object.freeze(mappings);
}
