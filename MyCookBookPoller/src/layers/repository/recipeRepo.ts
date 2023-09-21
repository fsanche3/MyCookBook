import {getDB} from "../database";
import { DatabaseRecipe, Recipe } from "../types";
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const processRecipes = async ({ recipes }:
    {
        recipes: Recipe[],
    }): Promise<void> => {
    try {
        const { db, pgp } = await getDB();
        const databaseRecipes: DatabaseRecipe[] = [];
        let recipeType: string= "";

        /*
        ** For each recipe, add recipe and each type to object/type
        */
        recipes.forEach(meal => {
            if(meal.dishTypes.includes("dinner")) recipeType = 'dinner';
            if(meal.dishTypes.includes("lunch")) recipeType = 'lunch';
            if(meal.dishTypes.includes("snack")) recipeType = 'snack';
            if(meal.dishTypes.includes("breakfast")) recipeType = 'breakfast';

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
        const { db, pgp } = await getDB();
        
        await db.any('DELETE FROM recipes');
    } catch (error) {
        logger.error({ error, funcName: "deleteRecipes"});
    }
}