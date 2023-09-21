import { deleteIngredients, processIngredients } from '../repository/ingredientRepo';
import { deleteRecipes, processRecipes } from '../repository/recipeRepo';
import Logger from "../utils/logger";
import { pollForRecipes } from '../repository/spoonRepo';

const logger = Logger.getInstance();

export const clearRecipes = async (): Promise<void> => {
    try {

        await deleteIngredients();

        await deleteRecipes();

    } catch (error) {
        console.log("Not working --> ", error)
        logger.error({ error, funcName: "clearRecipes" });
        throw (error);
    }
}

export const populateRecipes = async (): Promise<void> => {
    try {

        const recipes = await pollForRecipes();

        await processIngredients({ recipes });

        await processRecipes({ recipes });

    } catch (error) {
    logger.error({ error, funcName: "pollForRecipes" });
    throw (error);
}
}
