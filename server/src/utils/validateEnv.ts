import { cleanEnv, str, port } from 'envalid';
/**
 * Validates the environment variables.
 * cleanEnv returns a sanitized, immutable environment object. _Only_ the env
 * vars specified in the `validators` parameter will be accessible on the
 * returned object.
 */
function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        PORT: port({ default: 8080 }),
    });
}

export default validateEnv;
