import { Base, withDescription, withSummary } from "../common/common";

const Pathbase = withDescription(withSummary(Base));

class _OpenApiPath extends Pathbase {}

export const OpenApiPath = () => new _OpenApiPath();
export type OpenApiPathType = _OpenApiPath;
