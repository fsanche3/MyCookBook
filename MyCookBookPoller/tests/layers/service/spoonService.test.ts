import axios from 'axios';
import {clearRecipes, pollForRecipes} from '../../../src/layers/service/spoonService';

jest.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Test for Spoon Service", () => {

    afterEach(() => {
        jest.clearAllMocks();
        
    })

    it("Should ", () => {
        console.log("hello");
        expect("hell").toEqual("hell")
    })

    it("Should ", () => {
        
    })

    it("Should ", () => {
        
    })
    it("Should ", () => {
        
    })

})