import {
  withCallbacksComponent,
  withExamplesComponent,
  withHeadersComponent,
  withLinksComponent,
  withParametersComponent,
  withPathItemsComponent,
  withRequestBodiesComponent,
  withResponsesComponent,
  withSchemasComponent,
  withSecuritySchemesComponent,
} from "../common";
import type { OpenApiSchema } from "../schema";
import { Base, type BaseInterface } from "./base";
import type { OpenApiCallback } from "./OpenApiCallback";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiHeader } from "./OpenApiHeader";
import type { OpenApiLink } from "./OpenApiLink";
import type { OpenApiParameter } from "./OpenApiParameter";
import type { OpenApiPathItem } from "./OpenApiPathItem";
import {
  ReferenceObject,
  type OpenApiReferenceObject,
} from "./OpenApiReferenceObject";
import type { OpenApiRequestBody } from "./OpenApiRequestBody";
import type { OpenApiResponses } from "./OpenApiResponses";
import type { OpenApiSecurityScheme } from "./OpenApiSecurityScheme";

const ComponentBase = withPathItemsComponent(
  withCallbacksComponent(
    withLinksComponent(
      withSecuritySchemesComponent(
        withHeadersComponent(
          withRequestBodiesComponent(
            withExamplesComponent(
              withParametersComponent(
                withResponsesComponent(withSchemasComponent(Base))
              )
            )
          )
        )
      )
    )
  )
);

export type ComponentMappings =
  | OpenApiSchema
  | OpenApiResponses
  | OpenApiParameter
  | OpenApiExample
  | OpenApiRequestBody
  | OpenApiHeader
  | OpenApiSecurityScheme
  | OpenApiLink
  | OpenApiCallback
  | OpenApiPathItem
  | OpenApiReferenceObject;

export interface OpenApiComponent extends BaseInterface {
  addSchemas(
    mappings: Partial<{ [K in string]: OpenApiSchema | OpenApiReferenceObject }>
  ): this;
  addResponses(
    mappings: Partial<{
      [K in string]: OpenApiResponses | OpenApiReferenceObject;
    }>
  ): this;
  addParameters(
    mappings: Partial<{
      [K in string]: OpenApiParameter | OpenApiReferenceObject;
    }>
  ): this;
  addExamples(
    mappings: Partial<{
      [K in string]: OpenApiExample | OpenApiReferenceObject;
    }>
  ): this;
  addRequestBodies(
    mappings: Partial<{
      [K in string]: OpenApiRequestBody | OpenApiReferenceObject;
    }>
  ): this;
  addHeaders(
    mappings: Partial<{ [K in string]: OpenApiHeader | OpenApiReferenceObject }>
  ): this;

  addSecuritySchemes(
    mappings: Partial<{
      [K in string]: OpenApiSecurityScheme | OpenApiReferenceObject;
    }>
  ): this;

  addLinks(
    mappings: Partial<{ [K in string]: OpenApiLink | OpenApiReferenceObject }>
  ): this;

  addCallbacks(
    mappings: Partial<{
      [K in string]: OpenApiCallback | OpenApiReferenceObject;
    }>
  ): this;
  addPathItems(
    mappings: Partial<{
      [K in string]: OpenApiPathItem | OpenApiReferenceObject;
    }>
  ): this;

  /**
   * A convenient helper method that allows the creating of a dedicating mapping for all
   * potential reusable reference objects defined with the Component object. Developers may use this
   * method to obtain the reference object from a specific schema, pathItem, etc.
   *
   * @returns a FROZEN Mapping for each possible content mapping and its associated reference object.
   */
  createMappings(): Map<ComponentMappings, OpenApiReferenceObject>;
}

class _OpenApiComponent extends ComponentBase {
  createMappings(): Map<ComponentMappings, OpenApiReferenceObject> {
    const mappings: Map<ComponentMappings, OpenApiReferenceObject> = new Map();
    if (this._schemas !== undefined) {
      for (const [key, val] of this._schemas) {
        const reference = ReferenceObject.add$Ref(
          `#/components/schemas/${key}`
        );
        mappings.set(val, reference);
      }
    }
    if (this._parameters !== undefined) {
      for (const [key, val] of this._parameters) {
        const reference = ReferenceObject.add$Ref(
          `#/components/parameters/${key}`
        );
        mappings.set(val, reference);
      }
    }
    if (this._examples !== undefined) {
      for (const [key, val] of this._examples) {
        const reference = ReferenceObject.add$Ref(
          `#/components/examples/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._examples !== undefined) {
      for (const [key, val] of this._examples) {
        const reference = ReferenceObject.add$Ref(
          `#/components/examples/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._requestBodies !== undefined) {
      for (const [key, val] of this._requestBodies) {
        const reference = ReferenceObject.add$Ref(
          `#/components/requestBodies/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._headers !== undefined) {
      for (const [key, val] of this._headers) {
        const reference = ReferenceObject.add$Ref(
          `#/components/headers/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._securitySchemes !== undefined) {
      for (const [key, val] of this._securitySchemes) {
        const reference = ReferenceObject.add$Ref(
          `#/components/securitySchemes/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._links !== undefined) {
      for (const [key, val] of this._links) {
        const reference = ReferenceObject.add$Ref(`#/components/links/${key}`);
        mappings.set(val, reference);
      }
    }

    if (this._callbacks !== undefined) {
      for (const [key, val] of this._callbacks) {
        const reference = ReferenceObject.add$Ref(
          `#/components/callbacks/${key}`
        );
        mappings.set(val, reference);
      }
    }

    if (this._pathItems !== undefined) {
      for (const [key, val] of this._pathItems) {
        const reference = ReferenceObject.add$Ref(
          `#/components/pathItems/${key}`
        );
        mappings.set(val, reference);
      }
    }
    return Object.freeze(mappings);
  }
}

export const Component: OpenApiComponent = new _OpenApiComponent();
