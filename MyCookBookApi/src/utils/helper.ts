import jwt from 'jsonwebtoken';
import { envVariables } from "../environment/environment";
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

export const createToken = ({ refreshToken, userId } :
     { refreshToken: boolean, userId: number }) : string => {
    let token: string;

    if (!refreshToken) {
        token = jwt.sign({ userId, refreshToken: false },
            (envVariables.TOKEN_SECRET ?? "token_secret"), { expiresIn: 120 });

    } else {
        token = jwt.sign({ userId, refreshToken: true },
            envVariables.REFRESH_TOKEN_SECRET ?? "refresh_secret", { expiresIn: 125 });
    }

    return token;
}
