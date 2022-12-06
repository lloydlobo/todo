import { Document } from 'mongoose';

/**
 * Access all methods associated with mongoose Document
 * @example
 * ```js
 * _id: string;
 * __v: number;
 * get(path: string, type?: any): any);
 * set(path: string, val: any, type?: any): void);
 * ```
 */
export default interface Post extends Document {
    title: string;
    body: string;
}
