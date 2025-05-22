export function useValidationError<T>(
  value: T,
  isValid: boolean,
  rules: ((v: T) => true | string)[],
): string[] {
  if (!isValid && value) {
    const error = rules.find(rule => rule(value) !== true);
    return typeof error === 'function' ? [error(value) as string] : [];
  }
  return [];
}
