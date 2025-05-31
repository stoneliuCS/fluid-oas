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
  addSchemas(mappings: Partial<{ [K in string]: OpenApiSchema }>): this;
  addResponses(mappings: Partial<{ [K in string]: OpenApiResponses }>): this;
  addParameters(mappings: Partial<{ [K in string]: OpenApiParameter }>): this;
  addExamples(mappings: Partial<{ [K in string]: OpenApiExample }>): this;
  addRequestBodies(
    mappings: Partial<{ [K in string]: OpenApiRequestBody }>
  ): this;
  addHeaders(mappings: Partial<{ [K in string]: OpenApiHeader }>): this;

  addSecuritySchemes(
    mappings: Partial<{ [K in string]: OpenApiSecurityScheme }>
  ): this;

  addLinks(mappings: Partial<{ [K in string]: OpenApiLink }>): this;

  addCallbacks(mappings: Partial<{ [K in string]: OpenApiCallback }>): this;
  addPathItems(mappings: Partial<{ [K in string]: OpenApiPathItem }>): this;
}

class _OpenApiComponent extends ComponentBase implements OpenApiComponent {}

export const Component: OpenApiComponent = new _OpenApiComponent();
