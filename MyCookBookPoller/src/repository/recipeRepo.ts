import {getDB} from "../database";
import { DatabaseRecipe, Recipe } from "../types";
import Logger from "../utils/logger";

const {db, pgp} = getDB();
const logger = Logger.getInstance();

export const processRecipes = async ({ recipes, recipeType }:
    {
        recipes: Recipe[],
        recipeType: string
    }): Promise<void> => {
    try {
        const databaseRecipes: DatabaseRecipe[] = [];

        /*
        ** For each recipe, add recipe type to object/type
        */
        recipes.forEach(meal => {
            databaseRecipes.push({
                title: meal.title, servings: meal.servings, vegan: meal.vegan, vegetarian: meal.vegetarian,
                instructions: meal.instructions, summary: meal.summary, image: meal.image, readyinminutes: meal.readyInMinutes, type: recipeType
            })
        })

        const cache = new pgp.helpers.ColumnSet(['title', 'servings', 'vegan', 'vegetarian',
            'instructions', 'summary', 'image', 'readyinminutes', 'type'], { table: 'recipes' });

        const query = pgp.helpers.insert(databaseRecipes, cache) + 'RETURNING id';

        await db.any(query);

    } catch (error) {
        logger.error({ error, funcName: "processRecipes"});
    }
}

export const deleteRecipes = async (): Promise<void> => {
    try {
        await db.any('DELETE FROM recipes');
    } catch (error) {
        logger.error({ error, funcName: "deleteRecipes"});
    }
}