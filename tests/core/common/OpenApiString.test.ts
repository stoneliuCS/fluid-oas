import { describe, test, expect, afterEach } from 'bun:test';
import { OpenApiString } from '../../../src/core/schema/OpenApiString';
import { OpenApiDocumentation } from '../../../src/core/common/OpenApiDocumentation';
import { OpenApiXML } from '../../../src/core/common/OpenApiXML';
import { OpenApiDiscriminator } from '../../../src/core/common/OpenApiDiscriminator';

describe('OpenApiString tests.', () => {
  afterEach(() =>
    expect(OpenApiString().toJSON()).toMatchObject({ type: 'string' })
  );

  test('Test OpenApiString construction', () => {
    expect(OpenApiString().toJSON()).toMatchObject({ type: 'string' });
  });

  test('Test OpenApi minimum test.', () => {
    const actual = OpenApiString().min(1).toJSON();
    expect(actual).toMatchObject({ type: 'string', minLength: 1 });
  });

  test('Test OpenApi maximum test.', () => {
    const actual = OpenApiString().max(1).toJSON();
    expect(actual).toMatchObject({ type: 'string', maxLength: 1 });
  });

  test('Format test', () => {
    const actual = OpenApiString().format('uuid').toJSON();
    expect(actual).toMatchObject({ type: 'string', format: 'uuid' });
  });

  test('Pattern test', () => {
    const actual = OpenApiString().pattern(/ab+c/).toJSON();
    expect(actual).toMatchObject({ type: 'string', pattern: 'ab+c' });
  });

  test('Combined simple test', () => {
    const actual = OpenApiString()
      .min(1)
      .max(2)
      .format('uuid')
      .pattern(/ab+c/)
      .toJSON();
    expect(actual).toMatchObject({
      type: 'string',
      pattern: 'ab+c',
      minLength: 1,
      maxLength: 2,
      format: 'uuid',
    });
  });

  test('Test with advanced extensions', () => {
    const actual = OpenApiString()
      .min(1)
      .max(2)
      .format('uuid')
      .pattern(/ab+c/)
      .description('I can add anything I want!')
      .externalDocs(
        OpenApiDocumentation()
          .url('https://blah.com')
          .description('random website')
      )
      .xml(OpenApiXML().name('Stone').wrapped().namespace('stone'))
      .discriminator(
        OpenApiDiscriminator()
          .propertyName('blah')
          .mapping('some')
          .schema(OpenApiString())
      )
      .extend('x-something')
      .with(OpenApiString())
      .toJSON();

    expect(actual).toMatchObject({
      type: 'string',
      pattern: 'ab+c',
      minLength: 1,
      maxLength: 2,
      format: 'uuid',
      description: 'I can add anything I want!',
      'x-something': { type: 'string' },
      externalDocs: {
        url: 'https://blah.com',
        description: 'random website',
      },
      discriminator: {
        propertyName: 'blah',
        mapping: {
          some: { type: 'string' },
        },
      },
      xml: {
        name: 'Stone',
        namespace: 'stone',
        wrapped: true,
      },
    });
  });
});
