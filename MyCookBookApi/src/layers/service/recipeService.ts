import RecipeRepository from "../repository/recipeRepository";
import { DatabaseRecipesResponse, Recipe } from "../types";
import { containsRecipeTitle } from "../utils/helper";
import Logger from "../utils/logger";
import { injectable } from "tsyringe"

const logger = Logger.getInstance();

@injectable()
export default class RecipeService {

    constructor(private recipeRepo: RecipeRepository) {}

    async addFavoriteRecipe(body: Recipe): Promise<void> {
        try {

            body.ingredients.forEach((ingredient) => {
                ingredient.recipetitle = body.recipeTitle;
            })

            const recipe: Recipe = {
                recipeTitle: body.recipeTitle,
                servings: body.servings,
                vegan: body.vegan,
                vegetarian: body.vegetarian,
                instructions: body.instructions,
                summary: body.summary,
                image: body.image,
                readyInMinutes: body.readyInMinutes,
                type: body.type,
                ingredients: body.ingredients,
                userId: body.userId
            }

            await this.recipeRepo.addRecipeAndIngredients({ recipe: recipe });
            
        } catch (error) {
            logger.error({ error: error, funcName: "getRecipes Service" });
            throw error;
        }
    }

    async getRecipes(): Promise<Recipe[]> {
        try {
            const recipleList: DatabaseRecipesResponse[] = await this.recipeRepo.getRecipeAndIngredients();
            let recipesListResponse: Recipe[] = [];

            recipleList.forEach((dbRecipe) => {

                // Checks if the response list has the current Recipe by it's name/title
                if (!containsRecipeTitle({
                    recipeTitle: dbRecipe.recipetitle,
                    recipeList: recipesListResponse
                })) {

                    // If it does not, it stores the current recipe in desired format
                    recipesListResponse.push({
                        recipeTitle: dbRecipe.recipetitle,
                        servings: dbRecipe.servings,
                        vegan: dbRecipe.vegan,
                        vegetarian: dbRecipe.vegetarian,
                        instructions: dbRecipe.instructions,
                        summary: dbRecipe.summary,
                        image: dbRecipe.image,
                        readyInMinutes: dbRecipe.readyinminutes,
                        type: dbRecipe.type,
                        ingredients: [{
                            ingredientTitle: dbRecipe.title,
                            amount: dbRecipe.amount,
                            unit: dbRecipe.unit,
                            recipetitle: dbRecipe.recipetitle
                        }]
                    });
                } else {

                    // If it does, it adds the recipe's ingredient to the recipe
                    recipesListResponse.forEach((recipeResponse) => {
                        if (recipeResponse.recipeTitle === dbRecipe.recipetitle) {
                            recipeResponse.ingredients.push({
                                ingredientTitle: dbRecipe.title,
                                amount: dbRecipe.amount,
                                unit: dbRecipe.unit,
                                recipetitle: dbRecipe.recipetitle
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