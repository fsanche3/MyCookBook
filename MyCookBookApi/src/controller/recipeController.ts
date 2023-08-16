import { NextFunction, Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe"
import RecipeService from "../service/recipeService";
import Logger from "../utils/logger";
import { GetRecipesResponse } from "../types";

const router: Router = Router();
const logger = Logger.getInstance();

@autoInjectable()
export default class RecipeController{

    recipeServ: RecipeService;

    constructor(recipeServ: RecipeService){
        this.recipeServ = recipeServ;
    }

    router(){
        router.get("/", async (req, res, next) => await this.getAllRecipes(req, res, next));
        return router;
    }

    async getAllRecipes(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const recipeList: GetRecipesResponse[] = await this.recipeServ.getRecipes();
            res.send(recipeList);
            
        }catch(error){
            logger.error({error: error, funcName: "getAllRecipes Controller"})
            next(error);
        }
    }

 
}