import { getDB } from "../database";
import { DatabaseRecipesResponse, Recipe } from "../types";
import Logger from "../utils/logger";

const { db, pgp } = getDB();
const logger = Logger.getInstance();

export default class RecipeRepository {

    async getRecipeAndIngredients(): Promise<DatabaseRecipesResponse[]> {
        try {
            const recipeList: DatabaseRecipesResponse[] = await db.any("SELECT * FROM recipes INNER JOIN ingredients ON recipes.title = ingredients.recipetitle");
            return recipeList;
        } catch (error) {
            logger.error({ error: error, funcName: "getRecipeAndIngredients Repo" });
            throw error;
        }
    }

    async addRecipeAndIngredients({ recipe, userId }: { recipe: Recipe, userId: any }): Promise<void> {
        try {
            await db.any(`INSERT INTO favoriterecipes VALUES (default, '${recipe.recipeTitle}', '${recipe.servings}',
            '${recipe.vegan}', '${recipe.vegetarian}', '${recipe.instructions}', '${recipe.summary}', '${recipe.image}', 
            '${recipe.readyInMinutes}', '${recipe.type}', ${userId})`);

            const cache = new pgp.helpers.ColumnSet(['title', 'amount', 'unit', 'recipetitle', 'userId'], { table: 'favoriteingredients' });
            const query = pgp.helpers.insert(recipe.ingredients, cache);

            await db.any(query);
        } catch (error) {
            logger.error({ error: error, funcName: "getRecipeAndIngredients Repo" });
            throw error;
        }
    }
}