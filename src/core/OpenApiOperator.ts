import type {
  OperatorVisitor,
  RootParams,
  RouteParams,
  SchemaParams,
} from "../types/OperatorTypes";
import { OpenApiBuilder } from "./OpenApiBuilder";

export class RootVisitor implements OperatorVisitor<RootParams> {
  private readonly metadata?: Partial<RootParams>;

  public constructor(metadata?: Partial<RootParams>) {
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

  with<K extends keyof RootParams>(
    key: K,
    val: RootParams[K],
  ): OperatorVisitor<RootParams> {
    if (!this.metadata) {
      return new RootVisitor({ [key]: val });
    }
    const copy = structuredClone(this.metadata);
    copy[key] = val;
    return new RootVisitor(copy);
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
