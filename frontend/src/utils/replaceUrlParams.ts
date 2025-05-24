/**
 * Replaces URL parameters in a template string with provided values
 * @param template - URL template with parameters like ':paramName'
 * @param params - Object containing parameter values
 * @returns URL with replaced parameters
 */
export const replaceUrlParams = (template: string, params: Record<string, string | number>): string => {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, String(value)),
    template
  );
}; 