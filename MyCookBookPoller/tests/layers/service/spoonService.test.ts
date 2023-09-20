import axios from 'axios';
import {clearRecipes, pollForRecipes} from '../../../src/layers/service/spoonService';
import {deleteRecipes} from '../../../src/layers/repository/recipeRepo';
import {deleteIngredients} from '../../../src/layers/repository/ingredientRepo'


jest.mock('axios');
jest.mock('../../../src/layers/repository/recipeRepo');
jest.mock('../../../src/layers/repository/ingredientRepo');


const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Test for Spoon Service", () => {

    afterEach(() => {
        jest.clearAllMocks();
        
    })

    it("Should invoke clear recipes and ingredients ", async () => {

        // mockedAxios.mockResolvedValue({"records": 2});

        const ingredientRepoSpy : jest.SpyInstance = jest.
        spyOn({deleteIngredients}, 'deleteIngredients');

        const recipeRepoSpy : jest.SpyInstance = jest.
        spyOn({deleteRecipes}, 'deleteRecipes');

        await clearRecipes();

        expect(recipeRepoSpy).toBeCalledTimes(1);
        expect(ingredientRepoSpy).toBeCalledTimes(1);
    })

    it("Should ", () => {
        
    })

    it("Should ", () => {
        
    })
    it("Should ", () => {
        
    })

})