/** Controls the routing to business login in post.service */
import validationMiddleware from '@/middleware/validation.middleware';
import PostService from '@/resources/post/post.service';
import validate from '@/resources/post/post.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { Request, Router } from 'express';
/**
 * PostController
 */
class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    /**
     * Instantiate this class in index.ts.
     * @property path will be concatenated after /api,
     * in App.inialiseControllers(controllers) method.
     * @example http://localhost:8080/api/post
     * @property router is a sub-router added to main express router.
     */
    constructor() {
        this.initialRoutes();
    }

    private initialRoutes(): void {
        throw new Error('Method not implemented.');
    }
}

export default PostController;
