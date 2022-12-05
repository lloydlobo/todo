/**
 * Find current projects node environment.
 * @returns {any}
 * @sources https://nodejs.dev/en/learn/nodejs-the-difference-between-development-and-production/
 */
export function getNodeEnv() {
  switch (process?.env?.NODE_ENV) {
    case "production":
      return "production";
    case "development":
      return "development";
    // case "test":
    // return "test";
    default:
      console.error("Unknown environment. Defualting to production");
      return "development";
  }
}
