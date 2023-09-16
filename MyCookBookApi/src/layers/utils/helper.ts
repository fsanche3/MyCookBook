import jwt from 'jsonwebtoken';
import { envVariables } from "../environment";
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
        /*
        ** Expires in fifteen minutes
        */
        token = jwt.sign({ userId, refreshToken: false },
            (envVariables.TOKEN_SECRET ?? "token_secret"), { expiresIn: 900 });

    } else {
        /*
        ** Expires in 6 hours
        */
        token = jwt.sign({ userId, refreshToken: true },
            envVariables.REFRESH_TOKEN_SECRET ?? "refresh_secret", { expiresIn: 21600 });
    }

    return token;
}
