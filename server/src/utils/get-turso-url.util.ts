/**
 * Safely converts a libsql:// URL to https:// for serverless environments.
 * @param {string} url - The connection URL from environment variables.
 * @returns {string} The sanitized URL.
 */
export function getSanitizedTursoUrl(url: string | undefined): string {
  if (!url) return "";
  // Replaces the protocol part of the string
  return url.replace(/^libsql:\/\//, "https://");
}