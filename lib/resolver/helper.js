import { createRequire } from "node:module";
import { join } from "node:path";

/**
 * Create require function for a given path.
 *
 * @param {string} cwd
 * @returns {NodeRequire}
 */
export function createScopedRequire(cwd) {
  return createRequire(join(cwd, "__placeholder__.js"));
}
