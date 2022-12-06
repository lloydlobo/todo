/** App Setup. */
import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

/**
 * Application's server side API setup.
 * @see https://youtu.be/1o9YOHeKhNQ
 */
class App {
    public express: Application;
    public port: number;
    /**
     * Application API setup.
     * @property express {Application}
     * @property port {number}
     * - App Constructor.
     * @param {Controller[]} controllers
     * @param {number} port
     */
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling(); // Error middleware has to come last in Express apps.
    }
    /**
     * Initializes MongoDB database connection.
     * For more context, find examples in .env.example file in root directory.
     */
    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        // For docker images, omit `+srv` of Mongo Atlas.
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
        /**
         * Connect to MongoDB with mongoose driver.
         * @param {string} uri
         * @returns {Promise<typeof mongoose>}
         */
        mongoose.connect(uri);
    }
    /**
     * Initializes Express App middleware.
     */
    private initializeMiddleware(): void {
        this.express.use(helmet()); // Prevent common attacks made against APIs.
        this.express.use(cors());
        this.express.use(morgan('dev')); // Gives idea of requests and other logs.
        this.express.use(express.json()); // Parse body into json.
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression()); // Middleware from compressing requests.
    }
    /**
     * Initializes controllers with api endpoint prefix of /api.
     * @param {Controller[]} controllers
     */
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }
    /**
     * Initializes http error handling with express middleware.
     */
    private initializeErrorHandling(): void {
        // Do not call ErrorMiddleware function here.
        this.express.use(ErrorMiddleware);
    }
    /**
     * Make sure to call this function before starting the server.
     * Makes it accessible to outside of our App.
     */
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
