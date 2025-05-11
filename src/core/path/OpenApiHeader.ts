import {
  Base,
  Fixed,
  withContentMap,
  withDeprecated,
  withDescription,
  withExample,
  withExamplesMap,
  withExplode,
  withRequired,
  withSchema,
  withStyle,
} from '../common/common';

const HeaderBase = withDeprecated(withRequired(withDescription(Base)));

const HeaderBaseWithSchema = withExamplesMap(
  withExample(
    withSchema(withExample(withExplode(withStyle(HeaderBase)<'simple'>())))
  )
);

const HeaderBaseWithContent = withContentMap(HeaderBase);

class _OpenApiHeaderSchema extends HeaderBaseWithSchema {}
class _OpenApiHeaderContent extends HeaderBaseWithContent {}

export function OpenApiHeader(fixed: Fixed.CONTENT): _OpenApiHeaderContent;
export function OpenApiHeader(fixed: Fixed.SCHEMA): _OpenApiHeaderSchema;
export function OpenApiHeader(fixed: Fixed) {
  switch (fixed) {
    case Fixed.SCHEMA:
      return new _OpenApiHeaderSchema();
    case Fixed.CONTENT:
      return new _OpenApiHeaderContent();
  }
}

export type OpenApiHeader = _OpenApiHeaderSchema | _OpenApiHeaderContent;
