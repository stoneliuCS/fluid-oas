import { OpenApiBuilder } from "./OpenApiBuilder";
import type {
  MetadataParams,
  OperatorVisitor,
  RouteParams,
  SchemaParams,
} from "./OpenApiBuilderTypes";

export class MetadataVisitor implements OperatorVisitor<MetadataParams> {
  private readonly metadata?: Partial<MetadataParams>;

  public constructor(metadata?: Partial<MetadataParams>) {
    this.metadata = metadata;
  }

  operate(builder: OpenApiBuilder): OpenApiBuilder {
    if (!this.metadata) {
      return builder;
    }
    if (!builder.metadata) {
      return new OpenApiBuilder(this.metadata);
    }
    const newBuilder = Object.assign(builder.metadata, this.metadata);
    return new OpenApiBuilder(newBuilder);
  }

  with<K extends keyof MetadataParams>(
    key: K,
    val: MetadataParams[K],
  ): OperatorVisitor<MetadataParams> {
    if (!this.metadata) {
      return new MetadataVisitor({ [key]: val });
    }
    const copy = structuredClone(this.metadata);
    copy[key] = val;
    return new MetadataVisitor(copy);
  }
}

export class RouteVisitor implements OperatorVisitor<RouteParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
  with<K extends keyof RouteParams>(
    key: K,
    val: RouteParams[K],
  ): OperatorVisitor<RouteParams> {
    throw new Error("Method not implemented.");
  }
}

export class SchemaVisitor implements OperatorVisitor<SchemaParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
  with<K extends keyof SchemaParams>(
    key: K,
    val: SchemaParams[K],
  ): OperatorVisitor<SchemaParams> {
    throw new Error("Method not implemented.");
  }
}
