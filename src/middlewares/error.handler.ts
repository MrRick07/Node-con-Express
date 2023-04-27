import Boom from "boom"
import { ErrorRequestHandler, NextFunction, Response } from "express"

const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    next(err)
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

const errorBoomHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
    console.log('Boom')
    if (err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    }
    else
        next(err)
}

export { logErrors, errorHandler, errorBoomHandler }