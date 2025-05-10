import type { OpenApiArrayType } from "./OpenApiArray";
import type { OpenApiBooleanType } from "./OpenApiBoolean";
import type { OpenApiIntegerType } from "./OpenApiInteger";
import type { OpenApiNumberType } from "./OpenApiNumber";
import type { OpenApiObjectType } from "./OpenApiObject";
import type { OpenApiOneOfType } from "./OpenApiOneOf";
import type { OpenApiStringType } from "./OpenApiString";

export type OpenApiSchema =
  | OpenApiStringType
  | OpenApiNumberType
  | OpenApiIntegerType
  | OpenApiBooleanType
  | OpenApiObjectType
  | OpenApiArrayType
  | OpenApiOneOfType;
