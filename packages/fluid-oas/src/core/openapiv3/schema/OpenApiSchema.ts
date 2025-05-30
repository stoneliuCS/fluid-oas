import type { OpenApiBoolean } from "./OpenApiBoolean";
import type { OpenApiNull } from "./OpenApiNull";
import type { OpenApiInteger, OpenApiNumber } from "./OpenApiNumber";
import type { OpenApiObject } from "./OpenApiObject";
import type { OpenApiString } from "./OpenApiString";
import type { OpenApiUnion } from "./OpenApiUnion";

export type OpenApiSchema =
  | OpenApiString
  | OpenApiNumber
  | OpenApiBoolean
  | OpenApiInteger
  | OpenApiObject
  | OpenApiNull
  | OpenApiUnion;
