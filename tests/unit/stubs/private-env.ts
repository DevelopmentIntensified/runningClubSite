/**
 * Stub for `$env/dynamic/private` so server modules that import it can run
 * under Vitest. Values come straight from `process.env` (test:unit loads
 * .env.test via dotenv-cli).
 */
export const env = new Proxy(
  {},
  {
    get(_target, key) {
      return process.env[String(key)];
    },
    has(_target, key) {
      return String(key) in process.env;
    }
  }
) as Record<string, string>;
