import type { OpenApiBoolean } from "./OpenApiBoolean";
import type { OpenApiInteger, OpenApiNumber } from "./OpenApiNumber";
import type { OpenApiObject } from "./OpenApiObject";
import type { OpenApiString } from "./OpenApiString";

export type OpenApiSchema =
  | OpenApiString
  | OpenApiNumber
  | OpenApiBoolean
  | OpenApiInteger
  | OpenApiObject;
