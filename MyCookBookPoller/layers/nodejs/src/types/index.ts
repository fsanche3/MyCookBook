export interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: object;
}

export interface DatabaseResponse {
id: number;
}

export interface EnvVariables {
    HOST: string; 
    USER: string;
    PASS: string;
    DB: string;
    SPOON_API_URL: string;
    SPOON_API_KEY: string;
    QUEUE_URL: string;
}


export interface DatabaseIngredient{
    title: string;
    amount: number;
    unit: string;
    recipetitle: string;
}

export interface DatabaseRecipe{
    title: string;
    servings: number;
    vegan: boolean;
    vegetarian: boolean;
    instructions: string;
    summary: string;
    image: string;
    readyinminutes: number;
    type: string;
}

export interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

export interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

export interface Step {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
}

export interface AnalyzedInstructions {
    name: string;
    steps: Step[];
}

export interface Recipe {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[],
    instructions: string;
    analyzedInstructions: AnalyzedInstructions[];
    originalId?: object;
    spoonacularSourceUrl: string;
}

export interface SpoonResponse {
    data : {
        recipes: Recipe[]
    };
}

