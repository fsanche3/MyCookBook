import axios from 'axios';
import { SpoonResponse } from '../types';
import { deleteIngredients, processIngredients} from '../repository/ingredientRepo';
import { deleteRecipes, processRecipes } from '../repository/recipeRepo';
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const pollForRecipes = async (): Promise<void> => {
    try {
        /*
        ** Refresh and nuke recipes/ingredients every invoke
        */
        await deleteIngredients();
        await deleteRecipes();

        const generatedMealTypes = ['dinner', 'lunch', 'breakfast', 'snack'];

        /*
        ** For each meal type Spoonacular API offers 
        ** Query and proccess recipes/ingredients
        */
        for (const type of generatedMealTypes) {
            const { data }: SpoonResponse = await axios.get(
                `${process.env.SpoonApiUrl}/random?number=1&tags=${type}`,
                {
                    headers: {
                        'x-api-key': process.env.SpoonApiKey,
                        'Accept': "application/json",
                    },
                });

            await processIngredients({recipes: data.recipes});
            await processRecipes({recipes: data.recipes, recipeType: type});
        }
    } catch (error) {
        logger.error({message: error, funcName: "pollForRecipes"});
    }
}