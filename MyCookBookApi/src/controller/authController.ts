import { NextFunction, Request, Response, Router } from "express";
import { autoInjectable } from "tsyringe"
import Logger from "../utils/logger";
import AuthService from "../service/authService";

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
        return router;
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resp: boolean = await this.authServ.verifyAuth(req.body);

            if (!resp) {
                res.status(400).json("Login Failed: Incorrect username/password");
            } else {
                res.status(200).json(true);
            }

        } catch (error) {
            logger.error({ error: error, funcName: "login Controller" })
            next(error);
        }
    }
}