import { withMapping, withPropertyName } from "../../common/common";
import { Base } from "./base";

const DiscriminatorBase = withMapping(withPropertyName(Base));
class _OpenApiDiscriminator extends DiscriminatorBase {}

export const discriminator = () => new _OpenApiDiscriminator();
export type Discriminator = _OpenApiDiscriminator;
