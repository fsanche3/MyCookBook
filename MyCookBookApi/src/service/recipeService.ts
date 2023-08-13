import RecipeRepository from "../repository/recipeRepository";
import { DatabaseRecipesResponse, GetRecipesResponse } from "../types";
import { containsRecipeTitle } from "../utils/helper";
import Logger from "../utils/logger";
import { autoInjectable } from "tsyringe"

const logger = Logger.getInstance();

@autoInjectable()
export default class RecipeService {

    reicpeRepo: RecipeRepository;

    constructor(recipeRepo: RecipeRepository) {
        this.reicpeRepo = recipeRepo;
    }

    async getRecipes(): Promise<GetRecipesResponse[]> {
        try {
            const recipleList: DatabaseRecipesResponse[] = await this.reicpeRepo.getRecipeAndIngredients();
            let recipesListResponse: GetRecipesResponse[] = [];

            recipleList.forEach((dbRecipe) => {

            // Checks if the response list has the current Recipe by it's name/title
                if (!containsRecipeTitle({ recipeTitle: dbRecipe.recipetitle ,
                    recipeList: recipesListResponse})) {

            // If it does not, it adds the current recipe and ingredient
                    recipesListResponse.push({
                        recipe: {
                            recipeTitle: dbRecipe.recipetitle,
                            servings: dbRecipe.servings,
                            vegan: dbRecipe.vegan,
                            vegetarian: dbRecipe.vegetarian,
                            instructions: dbRecipe.instructions,
                            summary: dbRecipe.summary,
                            image: dbRecipe.image,
                            readyInMinutes: dbRecipe.readyinminutes,
                            type: dbRecipe.type,
                        },
                        ingredients: [{
                            ingredientTitle: dbRecipe.title,
                            amount: dbRecipe.amount,
                            unit: dbRecipe.unit,
                        }]
                    });
                } else {
                    
                // If it does, it adds the recipe's ingredient to the recipe
                    recipesListResponse.forEach((recipeResponse) => {
                        if (recipeResponse.recipe.recipeTitle === dbRecipe.recipetitle) {
                            recipeResponse.ingredients.push({
                                ingredientTitle: dbRecipe.title,
                                amount: dbRecipe.amount,
                                unit: dbRecipe.unit,
                            });
                        };
                    });
                }
            });

            return recipesListResponse;
            
        } catch (error) {
            logger.error({ error: error, funcName: "getRecipes Service" });
            throw error;
        }
    }
}