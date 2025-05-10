import { Base, withMapping, withPropertyName } from "./common";

class _OpenApiDiscriminator extends Base {}

const OpenApiDiscriminatorImpl = withMapping(
  withPropertyName(_OpenApiDiscriminator),
);
export const OpenApiDiscriminator = new OpenApiDiscriminatorImpl();
export type OpenApiDiscriminator = typeof OpenApiDiscriminator;
