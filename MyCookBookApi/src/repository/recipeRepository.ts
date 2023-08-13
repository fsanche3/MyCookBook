import { getDB } from "../database";
import { DatabaseRecipesResponse } from "../types";
import Logger from "../utils/logger";

const { db } = getDB();
const logger = Logger.getInstance();

export default class RecipeRepository {

    async getRecipeAndIngredients(): Promise<DatabaseRecipesResponse[]> {
        try {
            const recipeList: DatabaseRecipesResponse[] = await db.any("SELECT * FROM recipes INNER JOIN ingredients ON recipes.title = ingredients.recipetitle");
            return recipeList;
        } catch (error) {
            logger.error({error: error, funcName: "getRecipeAndIngredients Repo"});
            throw error;
        }
    }
}