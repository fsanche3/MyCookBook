import axios from 'axios';
import { environment } from '../environment';
import { Recipe, SpoonResponse } from '../types';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

export const pollForRecipes = async (): Promise<Recipe[]> => {
    try {
        const envVariables = await environment();
        const recipes : Recipe[] = [];
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
                data.recipes.forEach((recipe => recipes.push(recipe)));
        }
        return recipes;
        
    } catch (error) {
        logger.error({ error, funcName: "pollForRecipes"});
        throw(error);
    }
}