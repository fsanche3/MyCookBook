import Joi from 'joi';
import { GetFavoriteRecipesRequest, GetRefreshTokenRequest, UserRequest } from '../../types';

export const Schemas = {
    user: Joi.object<UserRequest>({
        username: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')).required(),
    }),

    refreshToken: Joi.object<GetRefreshTokenRequest>({
        oldRefreshToken: Joi.string().required(),
    }),

    userId: Joi.object<GetFavoriteRecipesRequest>({
        userId: Joi.number().required(),
    })
};