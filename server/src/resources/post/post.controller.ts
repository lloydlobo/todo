/** Controls the routing to business login in post.service */
import validationMiddleware from '@/middleware/validation.middleware';
import PostService from '@/resources/post/post.service';
import validate from '@/resources/post/post.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

/**
 * PostController class.
 * @implements Controller
 */
class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialRoutes();
    }

    private initialRoutes(): void {
        /** @method POST create a resource with POST request. */
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create), // Validate request body against schema.
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            /**
             * When using a service, creating post somwehere else, nice to have it
             * inside a ServiceWorker, and not a request handler.  For emails, send
             * it as a part of a queue.  Do not send request to your own api.
             */
            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });
        } catch (err) {
            /**
             * Send exception through error handler in error.middleware and, it
             * sends a response to client with res.status(...) and
             * res.json(...).
             */
            next(new HttpException(400, `Cannot create post: ${err}`)); // err: "Unable to create post" - from PostService try/catch.
        }
    };
}

export default PostController;
