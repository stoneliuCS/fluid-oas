# S.A.L.T
A Structured Application Programming Interface Language for TypeScript APIs

## Purpose
S.A.L.T is an internal/embedded Domain Specific Language for expressing type-safe web APIs written in TypeScript.

The core logic is to communicate a simple but expressive language which can generate three key things:
- Generate an OpenAPI Specification.
- Generate accompanying validators for schemas and request bodies.
- Generate TypeScript types from the given schemas/routes.

By generating the boilerplate definitions, API documentations, and validators from a single source of truth, you can guarantee the type-safety of your API through a simple top level abstraction layer.

This solution to API development is a much more lighter and flexible abstraction as compared to popular frameworks such as NestJS, tRPC, and GraphQL. In fact this is framework agnostic and can be used in both server-side development and client-side development which can share the specifications and type definitions and validators.
