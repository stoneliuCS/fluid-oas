import { withMapping, withPropertyName } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const DiscriminatorBase = withMapping(withPropertyName(Base));

interface Discriminator extends BaseInterface {
  addPropertyName(propertyName: string): this;
  addMap(name: string, val: string): this;
}

class _OpenApiDiscriminator
  extends DiscriminatorBase
  implements Discriminator {}

export function Discriminator(): Discriminator {
  return new _OpenApiDiscriminator();
}
export type OpenApiDiscriminator = Discriminator;
