/**
 * Determines if that uri is a valid uri over HTTP or HTTPs
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

export function validatePath(pathString: string): boolean {
  if (
    !pathString.startsWith("/") ||
    (pathString.trim().length > 1 && pathString.endsWith("/"))
  ) {
    return false;
  }

  const segments = pathString.split("/").slice(1);

  // Only root path case.
  if (segments.length === 1) return true;

  // Not allowed to have any empty space between slashes
  for (const segment of segments) {
    if (segment.length === 0) return false;
  }
  return true;
}
