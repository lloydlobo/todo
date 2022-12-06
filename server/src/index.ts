/**
 * index.ts - Entrypoint for the app for the backend server.
 */
import 'dotenv/config'; // Initialize env variables with dotenv asap.
import 'module-alias/register'; // Register all module alliases throughout the application.

import PostController from '@/resources/post/post.controller';
import validateEnv from '@/utils/validateEnv';
import App from './app';

/** Goes through env file and checks if we have everything we need. */
validateEnv();

/**
 * * Controller[] - Array of controls that sets up routes.
 * * port - Default is 8080.
 *
 * * Instantiate PostController which sets up the routes,
 * which then passes it into App constructor `controllers`, then
 * * Pass it in to initializeControllers(), and loop trhough controllers.
 * @reference ```js src/app.ts
 * this.express.use('/api', controller.router())
 * ```
 * * Then set them through your router in PostController public router.
 * @reference ```js @/resources/post/post.controller.ts
 * public router = Router();
 * ```
 * * Routes get handed to the above router through initialiseRoutes(),
 * @reference ```js @/resources/post/post.controller.ts
 *  private initialRoutes(): void {
 *      this.router.post(...
 *  ...
 *  }
 * ```
 * * Then it gets added to the main Express router and you can access from there.
 */
const app = new App([new PostController()], Number(process.env.PORT));

/** Expose API to outside world.*/
app.listen();

/**
 * ENDPOINTS
 * * /api/posts - POST - Create a new post.
 * @example ```json
 * {
 *  "title": "Test Title",
 *  "body": "Test posts body"
 * }
 * {
 *   "post": {
 *     "title": "Test Title",
 *     "body": "Test posts body",
 *     "_id": "638f0dda83a8437c13c61563",
 *     "createdAt": "2022-12-06T09:39:38.704Z",
 *     "updatedAt": "2022-12-06T09:39:38.704Z",
 *     "__v": 0
 *   }
 * }
 * ```
 */
