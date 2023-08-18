export interface AccessTokens {
    token: string;
    refreshToken: string;
}

export interface Recipe {
    recipeTitle: string;
    servings: number;
    vegan: boolean;
    vegetarian: boolean;
    instructions: string;
    summary: string;
    image: string;
    readyInMinutes: number;
    type: string;
    ingredients: [{
        ingredientTitle: string;
        amount: number;
        unit: string;
        userId?: number;
    }]
}

export interface DatabaseRecipesResponse {
    id: number;
    title: string;
    servings: number;
    vegan: boolean;
    vegetarian: boolean;
    instructions: string;
    summary: string;
    image: string;
    readyinminutes: number;
    type: string;
    amount: number;
    unit: string;
    recipetitle: string;
}

export interface User {
    id: any;
    username: string;
    password: string;
}
