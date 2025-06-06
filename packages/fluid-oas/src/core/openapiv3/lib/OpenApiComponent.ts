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
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";
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
}

class _OpenApiComponent extends ComponentBase {}

export const Component: OpenApiComponent = new _OpenApiComponent();
export type __OpenApiComponent__ = _OpenApiComponent;
