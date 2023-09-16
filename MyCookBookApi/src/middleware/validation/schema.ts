import Joi from 'joi';
import { PersistUserRequest } from '../../types';

export const Schemas = {
    user: Joi.object<PersistUserRequest>({
        username: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')).required(),
    })
};