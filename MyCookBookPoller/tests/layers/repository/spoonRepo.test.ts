import axios from 'axios';
import { pollForRecipes } from '../../../src/layers/repository/spoonRepo';
import { environment } from '../../../src/layers/environment'

jest.mock('axios');
jest.mock('../../../src/layers/environment');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Test for Spoon Repository", () => {

    it("Should fetch recipes from spoonacular", async () => {

        mockedAxios.mockResolvedValue({ data: { recipes: [] } })

        const envSpy: jest.SpyInstance = jest
            .spyOn({ environment }, 'environment')
            .mockResolvedValueOnce({
                HOST: "string", 
                USER: "string",
                PASS: "string",
                DB: "string",
                SPOON_API_URL: "string",
                SPOON_API_KEY: "string",
                QUEUE_URL: "string",
            });

        await pollForRecipes();

        expect(envSpy).toBeCalledTimes(1);
        expect(mockedAxios.call.length).toEqual(1);

    });

});