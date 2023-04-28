import boom from "@hapi/boom"
import { NextFunction, Request, Response } from "express"

const validatorHandler = (schema: any, property: string = 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: false })
        if (error) {
            return next(boom.badRequest(error))
        }
        next()
    }
}

export default validatorHandler