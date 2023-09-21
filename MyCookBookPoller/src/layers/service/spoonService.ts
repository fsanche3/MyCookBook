import { deleteIngredients, processIngredients } from '../repository/ingredientRepo';
import { deleteRecipes, processRecipes } from '../repository/recipeRepo';
import Logger from "../utils/logger";
import { pollForRecipes } from '../repository/spoonRepo';
import { DatabaseRecipe, Recipe } from '../types';

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

        const recipes: Recipe[] = await pollForRecipes();

        const databaseRecipes: DatabaseRecipe[] = [];
        let recipeType: string = "";

        /*
        ** For each recipe, add recipe and each type to object/type
        */
        recipes.forEach(meal => {
            if (meal.dishTypes.includes("dinner")) recipeType = 'dinner';
            if (meal.dishTypes.includes("lunch")) recipeType = 'lunch';
            if (meal.dishTypes.includes("snack")) recipeType = 'snack';
            if (meal.dishTypes.includes("breakfast")) recipeType = 'breakfast';

            databaseRecipes.push({
                title: meal.title, servings: meal.servings, vegan: meal.vegan, vegetarian: meal.vegetarian,
                instructions: meal.instructions, summary: meal.summary, image: meal.image, readyinminutes: meal.readyInMinutes, type: recipeType
            })
        })

        await processIngredients({ recipes });

        await processRecipes({ databaseRecipes });

    } catch (error) {
        logger.error({ error, funcName: "pollForRecipes" });
        throw (error);
    }
}
