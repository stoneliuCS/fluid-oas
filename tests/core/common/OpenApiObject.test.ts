import { describe, test, expect, afterEach } from 'bun:test';
import { OpenApiObject } from '../../../src/core/schema/OpenApiObject';
import { OpenApiString } from '../../../src/core/schema/OpenApiString';

describe('OpenApiDocumentation Construction Tests', () => {
  afterEach(() => {
    expect(OpenApiObject().toJSON()).toEqual({ type: 'object' });
  });

  test('Object creation logic', () => {
    expect(OpenApiObject().toJSON()).toEqual({ type: 'object' });
  });

  test('Object property logic', () => {
    const actual = OpenApiObject()
      .property('firstname')
      .schema(OpenApiString())
      .property('lastname')
      .schema(OpenApiString());
    expect(actual.toJSON()).toEqual({
      type: 'object',
      properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
      },
    });
  });
});
