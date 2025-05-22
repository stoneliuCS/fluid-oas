import { withMapping, withPropertyName } from "../../common/common";
import { Base } from "./base";

const DiscriminatorBase = withMapping(withPropertyName(Base));
class _OpenApiDiscriminator extends DiscriminatorBase {}

export function Discriminator() {
  return new _OpenApiDiscriminator();
}
export type OpenApiDiscriminator = _OpenApiDiscriminator;
