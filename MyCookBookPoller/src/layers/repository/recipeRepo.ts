import {getDB} from "../database";
import { DatabaseRecipe, Recipe } from "../types";
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const processRecipes = async ({ databaseRecipes }:
    {
        databaseRecipes: DatabaseRecipe[],
    }): Promise<void> => {
    try {
        const { db, pgp } = await getDB();
        
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