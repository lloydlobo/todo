import Post from '@/resources/post/post.interface';
import { model, Schema } from 'mongoose';
/**
 * PostSchema.
 */
const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * model or PostModel.
 * * name - 'Post' name of schema.
 * * Schema - PostSchema the schema used.
 */
export default model<Post>('Post', PostSchema);
