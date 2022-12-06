import { Document } from 'mongoose';
/**
 * Access all methods associated with mongoose Document
 * @example access _id,__v. and methods like get, set, delete, etc.
 */
export default interface Post extends Document {
    title: string;
    body: string;
}
