import { Base, withExtensions, withMapping, withPropertyName } from "./common";

class _OpenApiDiscriminator extends Base {}

const OpenApiDiscriminatorImpl = withExtensions(
  withMapping(withPropertyName(_OpenApiDiscriminator)),
);

export const OpenApiDiscriminator = new OpenApiDiscriminatorImpl();
