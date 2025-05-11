import { Base } from '../common/common';

const OperatorBase = Base;

class _OpenApiOperator extends OperatorBase {}

export type OpenApiOperation = () => _OpenApiOperator;
