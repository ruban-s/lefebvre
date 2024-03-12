/**
 * An array of routes that are accesible to the public
 * There routes do not need authendication
 * @type {string[]}
 */

export const publicRoutes = [];

/**
 * An array of routes that are used for authendication
 * There routes will redirect logged in user to /setting page
 * @type {string[]}
 */

export const authRoutes = ["/auth/login"];

/**
 * There routes do not need authendication and dont stop by middleware ever.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";
/**
 * Default redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
