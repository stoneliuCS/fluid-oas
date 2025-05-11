export const serializeError = (className: Function, propertyName: string) => {
  return `Cannot serialize ${className.name} properly. ${propertyName} is not defined yet. Please define it first`;
};

export function mapMap<V, R>(
  map: Map<string, V>,
  mapper: (value: V) => R
): Record<string, R> {
  const result: Record<string, R> = {};

  map.forEach((value, key) => {
    result[key] = mapper(value);
  });

  return result;
}
