/**
 * An array of routes that are accesible to the public
 * There routes do not need authendication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/access-denied"];

/**
 * An array of routes that are used for authendication
 * There routes will redirect logged in user to /setting page
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/planner",
  "/production",
  "/super-admin",
];

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

/**
 * An array of routes that are used for authendication
 * There routes will redirect logged in user to /setting page
 * @type {string[]}
 */

export const adminRoutes = [
  "/attendance",
  "/break",
  "/dashboard",
  "/employees",
  "/indirect-code",
  "/measures",
  "/report",
  "/resources",
  "/user",
];
export const plannerRoutes = [
  "/planner/project",
  "/planner/work-order",
  "/planner/resource-work-order",
  "/planner/closed-project",
  "/planner/unreleased-project",
  "/planner/released-project",
];
