import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logger from "../../utils/logger";

const logger = Logger.getInstance();

export const Validator = 
    async (schema: ObjectSchema, req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validateAsync(req.body);
        
        next();

    } catch (error) {
        logger.error({error, funcName: "Validator"});

        return res.status(422).json({ error });
    }
}
  
