/** Entrypoint for server app. */
import validateEnv from '@/utils/validateEnv';
import 'dotenv/config'; // Initialize env variables with dotenv asap.
import 'module-alias/register'; // Register all module al;iases throughout application.
import App from './app';

// Goes through env file and checks if we have everything we need.
validateEnv();

// Array of controls.
const app = new App([], Number(process.env.PORT));

// Expose API to outside world.
app.listen();
