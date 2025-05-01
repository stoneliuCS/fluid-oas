export class OpenApiDiscriminator {
  private readonly propertyName: string;
  private readonly mapping?: Map<string, string>;

  public static create(propertyName: string) {
    return new OpenApiDiscriminator(propertyName);
  }

  private constructor(propertyName: string, mapping?: Map<string, string>) {
    this.propertyName = propertyName;
    this.mapping = mapping;
  }
}
