import type { OpenApiBuilder } from "./OpenApiBuilder";

export interface OpenApiOperator {
  operate(builder: OpenApiBuilder): OpenApiBuilder;
}

export interface MetadataParams {
  newTitle?: string;
  newSummary?: string;
  apiUrl?: string;
}

export interface RouteParams {
  endpoint: string;
  type: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
}

export class MetadataOperator implements OpenApiOperator {
  private readonly metadataParams: MetadataParams;

  constructor(params: MetadataParams) {
    this.metadataParams = params;
  }

  /**
   * Operates on that OpenApiBuilder, if this MetadataOperator has no
   * params, this is a no-op.
   */
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
}


export class RouteOperator implements OpenApiOperator {
  private readonly routeParams: RouteParams | undefined;

  constructor(params: RouteParams) {
    this.routeParams = params;
  }

  /**
   * Operates on that OpenApiBuilder, if this MetadataOperator has no
   * params, this is a no-op.
   */
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
}


export class SchemaOperator<T> implements OpenApiOperator {
  private readonly schema: T;

  constructor(params: T) {
    this.schema = params;
  }

  /**
   * Operates on that OpenApiBuilder, if this MetadataOperator has no
   * params, this is a no-op.
   */
  operate(builder: OpenApiBuilder): OpenApiBuilder {
    throw new Error("Method not implemented.");
  }
}
