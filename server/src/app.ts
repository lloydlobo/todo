/** Setup. */

import ErrorMiddleware from '@middleware/error.middleware';
import Controller from '@utils/interfaces/controller.interface'; // file-syntax name.type.ts
import compression from 'compression'; // Middleware from compressing requests.
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet'; // Prevent common attacks made against APIs.
import mongoose from 'mongoose';
import morgan from 'morgan'; // Gives idea of requests and other logs.

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling(); // Error middleware has to come last in Express apps.
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env; // Destructure.

        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}` // For docker images, omit `+srv` of Mongo Atlas.
        );
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json()); // Parse body into json.
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    // Make it accessible to outside.
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
