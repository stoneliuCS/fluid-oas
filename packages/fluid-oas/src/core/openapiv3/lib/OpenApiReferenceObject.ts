import { withDescription, withRef, withSummary } from "../common";
import { Base, type BaseInterface } from "./base";

const ReferenceBase = withSummary(withDescription(withRef(Base)));

export interface OpenApiReferenceObject extends BaseInterface {
  add$Ref(val: string): this;
  addDescription(val: string): this;
  addSummary(val: string): this;
}

class _OpenApiReferenceObject
  extends ReferenceBase
  implements OpenApiReferenceObject {}

export const ReferenceObject: OpenApiReferenceObject =
  new _OpenApiReferenceObject();
