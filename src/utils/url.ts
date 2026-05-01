// Helper to build URLs that respect the configured base path
// (so the site works whether deployed at "/" or at "/stop-smart-meters-goa/")
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string = '/'): string {
  if (!path.startsWith('/')) path = '/' + path;
  return BASE + path;
}
