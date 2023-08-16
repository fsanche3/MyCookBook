import { NextFunction, Request, Response, Router } from "express";
import { autoInjectable } from "tsyringe"
import Logger from "../utils/logger";
import { GetRecipesResponse } from "../types";
import UserService from "../service/userService";

const router: Router = Router();
const logger = Logger.getInstance();

@autoInjectable()
export default class UserController {

    userServ: UserService;

    constructor(userServ: UserService) {
        this.userServ = userServ;
    }

    router() {
        router.post("/", async (req, res, next) => await this.persistUser(req, res, next));
        return router;
    }

    async persistUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resp: boolean = await this.userServ.addUser(req.body);

            if (resp) {
                res.status(200).json(resp);
            } else {
                res.status(400).json("Username is not unique");
            }
        } catch (error) {
            logger.error({ error: error, funcName: "persistUser Controller" })
            next(error);
        }
    }


}