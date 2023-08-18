import { Recipe } from "../types";

export const containsRecipeTitle = ({ recipeTitle, recipeList }:
    { recipeTitle: string, recipeList: Recipe[] }): boolean => {

    let recipeExist: boolean = false;

    if (recipeList.length === 0) {
        return recipeExist;
    }
    recipeList.forEach((currentRecipe) => {
        if (recipeTitle == currentRecipe.recipeTitle) {
            recipeExist = true;
        }
    });

    return recipeExist;
}
