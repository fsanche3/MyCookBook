import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "tsyringe"
import Logger from "../utils/logger";
import AuthService from "../service/authService";
import { AccessTokens } from "../types";
import { verifyJwt } from "../middleware/jwt";
import { Validator } from "../middleware/validation";
import { Schemas } from "../middleware/validation/schema";

const router: Router = Router();
const logger = Logger.getInstance();

@injectable()
export default class AuthController {

    constructor(private authServ: AuthService) {
    }

    router() {

        router.post("/login", (req, res, next) => Validator(Schemas.user, req, res, next),
        async (req, res, next) => await this.login(req, res, next));
        
        router.post("/token", (req, res, next) => Validator(Schemas.refreshToken, req, res, next),
        async (req, res, next) => await this.refreshToken(req, res, next));

        router.post("/logout", this.authenticateToken, 
        (req, res, next) => Validator(Schemas.userId, req, res, next),
        async (req, res, next) => await this.logout(req, res, next));

        return router;
    }

    authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (token) { 
            verifyJwt({token: token, request: req, response: res , nextFunc: next})
            
        } else {
            res.status(401).json("Unable to perform Token operation: Authentication Token Not found");
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessTokens: boolean | AccessTokens = await this.authServ.verifyAuth(req.body);

            if (!accessTokens) {
                res.status(400).json("Login Failed: Incorrect username/password");

            } else {
                res.status(200).json(accessTokens);
            }
        } catch (error) {
            logger.error({ error: error, funcName: "login Controller" })
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const refreshToken : string = await this.authServ.getRefreshToken(req.body);
            
            if (!refreshToken) {
                res.status(400).json("Get Refresh Token Failed: Authentication failure Or Refresh Token Limit Reached");
                
            } else {
                res.status(200).json({refreshToken: refreshToken});
            }
        } catch (error) {
            logger.error({ error: error, funcName: "refreshToken Controller" })
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.authServ.removeRefreshTokensFromDb(req.body);

            res.status(200).json(true);

        } catch (error) {
            logger.error({ error: error, funcName: "logout Controller" })
            next(error);
        }
    }
}