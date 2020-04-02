import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode)
        return res.status(err.statusCode).send({ error: err.toJSON() });

    res.status(500).send({
        error: {
            message: err.message || "Internal server error",
            statusCode: 500
        }
    });
}