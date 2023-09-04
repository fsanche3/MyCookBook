import axios from 'axios';
import { EnvVariables, SpoonResponse } from '../types';
import { deleteIngredients, processIngredients} from '../repository/ingredientRepo';
import { deleteRecipes, processRecipes } from '../repository/recipeRepo';
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const clearRecipes = async (): Promise<void> =>{
    try {

        await deleteIngredients();
        await deleteRecipes();

    } catch (error) {
        logger.error({ error, funcName: "clearRecipes"});
    }
} 

export const pollForRecipes = async ({envVariables} : {envVariables: EnvVariables}): Promise<void> => {
    try {

        const generatedMealTypes = ['dinner', 'lunch', 'breakfast', 'snack'];

        /*
        ** For each meal type Spoonacular API offers 
        ** Query and proccess recipes/ingredients
        */
        for (const type of generatedMealTypes) {
            const { data }: SpoonResponse = await axios.get(
                `${envVariables.SPOON_API_URL}/random?number=1&tags=${type}`,
                {
                    headers: {
                        'x-api-key': envVariables.SPOON_API_KEY,
                        'Accept': "application/json",
                    },
                });
                
            await processIngredients({recipes: data.recipes});
            await processRecipes({recipes: data.recipes, recipeType: type});
        }
    } catch (error) {
        logger.error({ error, funcName: "pollForRecipes"});
    }
}