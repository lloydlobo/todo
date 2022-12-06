import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

/**
 * validationMiddleware validates the request body against the schema.
 * @param {Joi.Schema} schema
 * Go through all passed through data and validate it with validation
 * options/schema we pass through.
 *
 * - schema.validAsync options {validationOptions}
 * @property {abortEarly} Stops the request on first validation error
 * and returns all errors to user quickly. So it returns all specific
 * password & adds invalid password to list of errors prior to it.
 * @property {allowUnknown} Fails if something passed in is not a part
 * of schema.
 * @property {allowUnknown} Strips rejects from allowUnknown and gets
 * rid of it. Stops from crashing.
 */
function validationMiddleware(schema: Joi.Schema): RequestHandler {
    {
        return async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            const validationOptions = {
                abortEarly: false,
                allowUnknown: true,
                stripUnknwn: true,
            };

            try {
                /* Validates a value using the schema and options.
                   Value is equal to data passed through after being compared
                   to schema and stripped of unwanted values.  */
                const value = await schema.validateAsync(
                    req.body,
                    validationOptions
                );
                req.body = value;
                next();
            } catch (e: unknown) {
                const errors: string[] = [];
                (e as any).details.forEach((error: Joi.ValidationErrorItem) => {
                    errors.push(error.message);
                });
                /* Send and display errors through,
                 API request or frontend like React. */
                res.status(400).send({ errors: errors });
            }
        };
    }
}

export default validationMiddleware;
