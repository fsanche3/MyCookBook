import UserRepository from "../repository/userRepository";
import Logger from "../utils/logger";
import bcrypt from 'bcrypt';
import { DatabaseRecipesResponse, Recipe, User } from "../types";
import { RecipeRepository } from "../repository";
import { containsRecipeTitle } from "../utils/helper";

const logger = Logger.getInstance();

export default class UserService {

    userRepo: UserRepository;
    recipeRepo: RecipeRepository;

    constructor(userRepo: UserRepository, recipeRepo: RecipeRepository) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
    }

    async addUser(body: { username: string, password: string }): Promise<boolean> {
        try {
            const userList: User[] = await this.userRepo.includesUsername(body.username);

            if (userList.length) return false;

            const hash = await bcrypt.hash(body.password, 10);

            await this.userRepo.saveUser({ username: body.username, password: hash });

            return true;

        } catch (error) {
            logger.error({ error: error, funcName: "addUser Service" });
            throw error;
        }
    }

    async getFavoriteRecipes(body: {userId: number}): Promise<Recipe[]> {
        try {
            const recipleList: DatabaseRecipesResponse[] = await this.recipeRepo.getFavoriteRecipeAndIngredients(body.userId);
            let recipesListResponse: Recipe[] = [];

            recipleList.forEach((dbRecipe) => {

                // Checks if the response list has the current Recipe by it's name/title
                if (!containsRecipeTitle({recipeTitle: dbRecipe.recipetitle,recipeList: recipesListResponse}))
                {
                    // If it does not contain the recipe title, it stores the current recipe in desired format
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
            logger.error({ error: error, funcName: "getFavoriteRecipes Service" });
            throw error;
        }
    }
}