export const serializeError = (className: Function, propertyName: string) => {
  return `Cannot serialize ${className.name} properly. ${propertyName} is not defined yet. Please define it first`;
};

export function mapMap<K, V, R>(
  map: Map<K, V>,
  mapper: (value: V) => R,
): Map<K, R> {
  const result: any = {};

  map.forEach((value, key) => {
    result[key] = mapper(value);
  });

  return result;
}
