import { getDB } from '../../../src/layers/database';
import { deleteTokens } from '../../../src/layers/repository/authRepo';
import { deleteIngredients, processIngredients } from '../../../src/layers/repository/ingredientRepo';
import { deleteRecipes, processRecipes } from '../../../src/layers/repository/recipeRepo';

jest.mock('../../../src/layers/database');

describe("Test for Database Repository", () => {

    it("Should delete tokens from db", async () => {

        const dbSpy: jest.SpyInstance = jest
            .spyOn({ getDB }, 'getDB')
            .mockImplementation(
                
                    db: jest.fn(),
                    pgp: jest.fn()
                
            );

        await deleteTokens();

        expect(dbSpy).toBeCalledTimes(1);
    });

});

