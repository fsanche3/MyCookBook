import jwt from 'jsonwebtoken';
import { Request, Response ,NextFunction } from "express";
import { envVariables } from "../environment/environment";
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const verifyJwt = ({ token, request, response, nextFunc }:
    { token: string, request: Request, response: Response ,nextFunc: NextFunction }): void => {

    jwt.verify(token, envVariables.TOKEN_SECRET ?? "token_secret", (err, payload) => {
        if (!err?.message) {
            request.body.userId = JSON.parse(JSON.stringify(payload)).id;
            nextFunc();
        } else {
            jwt.verify(token, envVariables.REFRESH_TOKEN_SECRET ?? "refresh_secret", (err, payload) => {
                if (!err?.message) {
                    request.body.userId = JSON.parse(JSON.stringify(payload)).id;
                    nextFunc();
                } else {
                    logger.warn({ message: "Bad Token Request Was Made"})
                    response.status(403).json("Unable to perform Login: Authentication Failed")
                }
            });
        }
    });
}