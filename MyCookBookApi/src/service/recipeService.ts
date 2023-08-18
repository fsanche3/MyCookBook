import RecipeRepository from "../repository/recipeRepository";
import { DatabaseRecipesResponse, Recipe } from "../types";
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

    async addFavoriteRecipe(body: {recipe: Recipe, userId: number}): Promise<void> {
        try {

            body.recipe.ingredients.forEach((ingredient) => {
                ingredient.userId = body.userId;
            })

            const recipe: Recipe = {
                recipeTitle: body.recipe.recipeTitle,
                servings: body.recipe.servings,
                vegan: body.recipe.vegan,
                vegetarian: body.recipe.vegetarian,
                instructions: body.recipe.instructions,
                summary: body.recipe.summary,
                image: body.recipe.image,
                readyInMinutes: body.recipe.readyInMinutes,
                type: body.recipe.type,
                ingredients: body.recipe.ingredients
            }

            await this.reicpeRepo.addRecipeAndIngredients({ recipe: recipe, userId: body.userId });
            
        } catch (error) {
            logger.error({ error: error, funcName: "getRecipes Service" });
            throw error;
        }
    }

    async getRecipes(): Promise<Recipe[]> {
        try {
            const recipleList: DatabaseRecipesResponse[] = await this.reicpeRepo.getRecipeAndIngredients();
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