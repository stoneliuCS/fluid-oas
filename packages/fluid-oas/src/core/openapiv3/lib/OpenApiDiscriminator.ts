import { withMapping, withPropertyName } from "../common";
import { Base, type BaseInterface } from "./base";

const DiscriminatorBase = withMapping(withPropertyName(Base));

export interface OpenApiDiscriminator extends BaseInterface {
  addPropertyName(propertyName: string): this;
  addMappings(mappings: Partial<{ [K in string]: string }>): this;
}

class _OpenApiDiscriminator
  extends DiscriminatorBase
  implements OpenApiDiscriminator {}

// Discriminator Object.
export const Discriminator: {
  addPropertyName(propertyName: string): OpenApiDiscriminator;
} = {
  addPropertyName(propertyName): OpenApiDiscriminator {
    return new _OpenApiDiscriminator().addPropertyName(propertyName);
  },
};
