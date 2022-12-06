import HttpException from '@utils/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

/**
 * errorMiddleware.
 * Error middleware has to come last in Express apps
 *
 * @param error Creates error specific to http exceptions.
 * @param req Express Request.
 * @param res Express Response.
 * @param next Express NextFunction.
 */
function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).send({
        status: status,
        message: message,
    });
}

export default errorMiddleware;
