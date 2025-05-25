import { withMapping, withPropertyName } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const DiscriminatorBase = withMapping(withPropertyName(Base));

export interface OpenApiDiscriminator extends BaseInterface {
  addPropertyName(propertyName: string): this;
  addMap(name: string, val: string): this;
}

class _OpenApiDiscriminator
  extends DiscriminatorBase
  implements OpenApiDiscriminator {}

export function Discriminator(): OpenApiDiscriminator {
  return new _OpenApiDiscriminator();
}
