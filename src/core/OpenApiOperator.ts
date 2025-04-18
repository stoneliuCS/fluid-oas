import type { OpenApiBuilder } from "./OpenApiBuilder";

export type OperatorParams = MetadataParams | RouteParams | SchemaParams;

export interface OperatorVisitor<OperatorParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder;
  with<K extends keyof OperatorParams>(
    key: K,
    val: OperatorParams[K],
  ): OperatorVisitor<OperatorParams>;
}

interface MetadataParams {
  title?: string;
}

interface RouteParams {
  apiRoute: string;
  type: "POST" | "PUT" | "PATCH" | "GET" | "DELETE"
}

interface SchemaParams {}

export class MetadataVisitor implements OperatorVisitor<MetadataParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
  with<K extends keyof MetadataParams>(
    key: K,
    val: MetadataParams[K],
  ): OperatorVisitor<MetadataParams> {
    throw new Error("Method not implemented.");
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
