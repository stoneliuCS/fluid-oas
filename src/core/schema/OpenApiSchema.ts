import type { Boolean } from "./OpenApiBoolean";
import type { Integer, Number } from "./OpenApiNumber";
import type { Object } from "./OpenApiObject";
import type { String } from "./OpenApiString";

export type OpenApiSchema = String | Number | Boolean | Integer | Object;
