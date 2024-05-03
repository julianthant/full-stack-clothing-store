/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes: string[] = [
  '/',
  '/auth/new-verification',
  '/privacy',
  '/terms',
];

/**
 * An array of routes that cannot be accessed
 */
export const invalidRoutes: string[] = ['/settings/edit'];

/**
 * An array of routes that can be accessed if the pathname starts with this prefix
 */
export const prefixRoutes: string[] = ['/shop'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/';
