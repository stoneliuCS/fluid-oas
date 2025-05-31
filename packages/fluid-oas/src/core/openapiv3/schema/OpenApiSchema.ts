import type { OpenApiArray } from "./OpenApiArray";
import type { OpenApiBoolean } from "./OpenApiBoolean";
import type { OpenApiConst } from "./OpenApiConst";
import type { OpenApiEnum } from "./OpenApiEnum";
import type { OpenApiNull } from "./OpenApiNull";
import type { OpenApiInteger, OpenApiNumber } from "./OpenApiNumber";
import type { OpenApiObject } from "./OpenApiObject";
import type { OpenApiString } from "./OpenApiString";
import type { OpenApiUnion } from "./OpenApiUnion";

export type OpenApiSchema =
  // Primitive Types
  | OpenApiString
  | OpenApiNumber
  | OpenApiBoolean
  | OpenApiInteger
  | OpenApiNull
  // Object Types
  | OpenApiObject
  | OpenApiArray
  // Special Utility Types
  | OpenApiConst
  | OpenApiEnum
  | OpenApiUnion;
