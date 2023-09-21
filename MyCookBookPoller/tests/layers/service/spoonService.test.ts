import { clearRecipes, populateRecipes } from '../../../src/layers/service/spoonService';
import { deleteRecipes, processRecipes } from '../../../src/layers/repository/recipeRepo';
import { deleteIngredients, processIngredients } from '../../../src/layers/repository/ingredientRepo'
import { pollForRecipes } from '../../../src/layers/repository/spoonRepo';

jest.mock('../../../src/layers/repository/spoonRepo');
jest.mock('../../../src/layers/repository/recipeRepo');
jest.mock('../../../src/layers/repository/ingredientRepo');

// const mockedAxios = axios as jest.MockedFunction<typeof axios>;
describe("Test for Spoon Service", () => {

    it("Should invoke clear recipes and ingredients ", async () => {

        const ingredientRepoSpy: jest.SpyInstance = jest
            .spyOn({ deleteIngredients }, 'deleteIngredients');

        const recipeRepoSpy: jest.SpyInstance = jest
            .spyOn({ deleteRecipes }, 'deleteRecipes');

        await clearRecipes();

        expect(recipeRepoSpy).toBeCalledTimes(1);
        expect(ingredientRepoSpy).toBeCalledTimes(1);
    })

    it("Should poll for recipes", async () => {

        // const mockResp: SpoonResponse = { "data": { recipes: [] } };

        // mockedAxios.mockResolvedValue(mockResp);

        const spoonRepoSpy: jest.SpyInstance = jest.
        spyOn({ pollForRecipes }, 'pollForRecipes');

        const ingredientRepoSpy: jest.SpyInstance = jest.
            spyOn({ processIngredients }, 'processIngredients');

        const recipeRepoSpy: jest.SpyInstance = jest.
            spyOn({ processRecipes }, 'processRecipes');


        await populateRecipes();

        expect(spoonRepoSpy).toBeCalledTimes(1);
        expect(recipeRepoSpy).toBeCalledTimes(1);
        expect(ingredientRepoSpy).toBeCalledTimes(1);

    })
});