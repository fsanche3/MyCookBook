import { NextFunction, Request, Response, Router } from "express";
//import { injectable } from "tsyringe"
import {RecipeService} from "../service/recipeService";
import Logger from "../utils/logger";
import { Recipe } from "../types";
import { verifyJwt } from "../middleware/jwt";

const router: Router = Router();
const logger = Logger.getInstance();

//@injectable()
export class RecipeController {
    constructor(private recipeServ: RecipeService) {}
    public static inject = ['recipeService'] as const;

    router() {
        router.get("/", async (req, res, next) => await this.getAllRecipes(req, res, next));

        router.post("/", this.authenticateToken, async (req, res, next) => await this.addRecipe(req, res, next));
        return router;
    }

    authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (token) { 
            verifyJwt({token: token, request: req, response: res , nextFunc: next})
        } else {
            res.status(401).json("Unable to perform Recipe Operations: Authentication Token Not found");
        }
    }

    async getAllRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const recipeList: Recipe[] = await this.recipeServ.getRecipes();

            res.send(recipeList);

        } catch (error) {
            logger.error({ error: error, funcName: "getAllRecipes Controller" })
            next(error);
        }
    }

    async addRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.recipeServ.addFavoriteRecipe(req.body);

            res.status(200).json(true);
            
        } catch (error) {
            logger.error({ error: error, funcName: "addRecipe Controller" })
            next(error);
        }
    }

}