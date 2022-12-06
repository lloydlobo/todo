/**
 * Business Logic: Services.
 * Advantage: Any models we use, we import in servince and not the controller
 * So controller remains clutter free.
 */

import Post from '@/resources/post/post.interface'; // Avoid using IPost for prefixing interfaces, but be consistent if you do.
import PostModel from './post.model';

/**
 * PostService.
 * Initialize this in PostController inside:
 * `@/resources/post/post.controller.ts`
 * @class PostService
 * @property {PostModel} post schema.
 */
class PostService {
    private post = PostModel;

    /**
     * Create a new post asynchronously.
     * @param title Title of the post.
     * @param  body Body of the post.
     */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (err: unknown) {
            throw new Error(`Unable to create post: ${err}`);
        }
    }
}

export default PostService;
