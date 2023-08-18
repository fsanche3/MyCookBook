import { NextFunction, Request, Response, Router } from "express";
import { autoInjectable } from "tsyringe"
import Logger from "../utils/logger";
import AuthService from "../service/authService";
import { AccessTokens } from "../types";

const router: Router = Router();
const logger = Logger.getInstance();

@autoInjectable()
export default class AuthController {

    authServ: AuthService;

    constructor(authServ: AuthService) {
        this.authServ = authServ;
    }

    router() {
        router.post("/login", async (req, res, next) => await this.login(req, res, next));
        // router.post("/token", async (req, res, next) => await this.refreshToken(req, res, next));
        // router.post("/logout", async (req, res, next) => await this.logout(req, res, next));
        return router;
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

    // async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const tokenVerified: boolean = await this.authServ.verifyToken(req.body);

    //         if (!tokenVerified) {
    //             res.status(400).json("Login Failed: Incorrect username/password");
    //         } else {
    //             const refreshToken = await this.authServ.getToken(req.body);

    //             res.status(200).json(refreshToken);
    //         }
    //     } catch (error) {
    //         logger.error({ error: error, funcName: "login Controller" })
    //         next(error);
    //     }
    // }

    // async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const resp: boolean | AccessTokens = await this.authServ.verifyAuth(req.body);

    //         if (!resp) {
    //             res.status(400).json("Login Failed: Incorrect username/password");
    //         } else {
    //             res.status(200).json(true);
    //         }

    //     } catch (error) {
    //         logger.error({ error: error, funcName: "login Controller" })
    //         next(error);
    //     }
    // }
}