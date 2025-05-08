import type { OpenApiDiscriminator } from "../common/OpenApiDiscriminator";
import type { OpenApiDocumentation } from "../common/OpenApiDocumentation";
import type { OpenApiXML } from "../common/OpenApiXML";
import type { OpenApiSpecificationProperty } from "../types/OpenApi";

abstract class _OpenApiSchema
  implements OpenApiSpecificationProperty<_OpenApiSchema>
{
  protected constructor(
    private readonly _discriminator?: OpenApiDiscriminator,
    private readonly _xml?: OpenApiXML,
    private readonly _externalDocs?: OpenApiDocumentation,
    private readonly _example?: string,
  ) {}

  public abstract toJSON(): unknown;
  public abstract extend(name: string, schema: OpenApiSchema): OpenApiSchema;
  public abstract discriminator(
    discriminator: OpenApiDiscriminator,
  ): OpenApiSchema;
  public abstract xml(xml: OpenApiXML): OpenApiSchema;
  public abstract externalDocs(
    externalDocs: OpenApiDocumentation,
  ): OpenApiSchema;
  public abstract example(example: string): OpenApiSchema;
}

export type OpenApiSchema = _OpenApiSchema;
