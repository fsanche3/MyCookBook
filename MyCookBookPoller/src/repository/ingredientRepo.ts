import { getDB } from "../database";
import { DatabaseIngredient, Recipe } from "../types";
import Logger from "../utils/logger";

const {db, pgp} = getDB();
const logger = Logger.getInstance();

export const processIngredients = async ({recipes}: {recipes: Recipe[]}): Promise<void> => {
    try {

        const ingredients: DatabaseIngredient[] = [];

        /*
        ** For each recipe, add ingredients to ingredients array.
        ** With respective recipe title included in Ingredient object/type
        */
        recipes.forEach(meal => {
            meal.extendedIngredients.forEach(ingredient => {
                ingredients.push({ title: ingredient.name, amount: ingredient.amount, unit: ingredient.unit, recipetitle: meal.title });
            })
        })

        const cache = new pgp.helpers.ColumnSet(['title', 'amount', 'unit', 'recipetitle']
            , { table: 'ingredients' });
        const query = pgp.helpers.insert(ingredients, cache);

        await db.any(query);

    } catch (error) {
        logger.error({message: error, funcName: "processIngredients"})
    }
}

export const deleteIngredients = async (): Promise<void> => {
    try {
        await db.any('DELETE FROM ingredients');
    } catch (error) {
        logger.error({message: error, funcName: "deleteIngredients"})
    }
}