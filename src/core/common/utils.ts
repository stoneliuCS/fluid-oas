export const serializeError = (className: Function, propertyName: string) => {
  return `Cannot serialize ${className.name} properly. ${propertyName} is not defined yet. Please define it first`;
};
