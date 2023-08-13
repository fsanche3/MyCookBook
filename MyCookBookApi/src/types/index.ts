export interface GetRecipesResponse {
    recipe: {
        recipeTitle: string;
        servings: number;
        vegan: boolean;
        vegetarian: boolean;
        instructions: string;
        summary: string;
        image: string;
        readyInMinutes: number;
        type: string;
    }
    ingredients: [{
        ingredientTitle: string;
        amount: number;
        unit: string;
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