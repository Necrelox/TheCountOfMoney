import { ErrorEntity } from './ErrorEntity';
import { Response } from 'express';

export function errorManager(error: unknown, res: Response) {
    if (error instanceof ErrorEntity) {
        res.status(error.getCode()).send({
            code: error.getCode(),
            content: error.getMessage()
        });
    } else {
        res.status(500).send({
            code: 500,
            content: 'Internal Server Error'
        });
    }
}
