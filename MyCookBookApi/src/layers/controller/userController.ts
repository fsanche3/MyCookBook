import { NextFunction, Request, Response, Router } from "express";
import Logger from "../utils/logger";
import UserService from "../service/userService";
import { verifyJwt } from "../middleware/jwt";
import { Recipe } from "../types";
import { Validator } from "../middleware/validation";
import { Schemas } from "../middleware/validation/schema";

const router: Router = Router();
const logger = Logger.getInstance();

export default class UserController {

    userServ: UserService;

    constructor(userServ: UserService) {
        this.userServ = userServ;
    }

    router() {
        router.get("/favorite/recipes", this.authenticateToken,
        (req: Request, res: Response, next: NextFunction) => Validator(Schemas.userId, req, res, next), 
        async (req, res, next) => await this.getFavoriteRecipes(req, res, next));

        router.post("/persist", (req, res, next) => Validator(Schemas.user, req, res, next), 
        async (req, res, next) => await this.persistUser(req, res, next));

        return router;
    }

    authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (token) { 

            verifyJwt({token: token, request: req, response: res , nextFunc: next})

        } else {
            res.status(401).json("Unable to perform request: Authentication Token Not found");
        }
    }

    async getFavoriteRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const recipeList: Recipe[] = await this.userServ.getFavoriteRecipes(req.body);

            res.send(recipeList);

        } catch (error) {
            logger.error({ error: error, funcName: "getAllRecipes Controller" });
            next(error);
        }
    }


    async persistUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resp: boolean = await this.userServ.addUser(req.body);

            if (!resp) {
                res.status(400).json("Username is not unique");

            } else {
                res.status(200).json(resp);
            }
        } catch (error) {
            logger.error({ error: error, funcName: "persistUser Controller" })
            next(error);
        }
    }
}