/**
 * Determines if that uri is a valid uri.
 *
 * Courtesy of: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
export function isValidUri(maybeUri: string): boolean {
  let url = undefined;

  try {
    url = new URL(maybeUri);
  } catch {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
