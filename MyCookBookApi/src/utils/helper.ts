import { GetRecipesResponse } from "../types";

export const containsRecipeTitle = ({recipeTitle, recipeList} : 
    {recipeTitle: string, recipeList: GetRecipesResponse[]}): boolean => {

    let recipeExist : boolean = false;    
    
    if(recipeList.length === 0){
        return recipeExist;
    }
    recipeList.forEach((currentRecipe) => {
        if(recipeTitle == currentRecipe.recipe.recipeTitle){
            recipeExist = true;
        } 
    });

    return recipeExist;
}