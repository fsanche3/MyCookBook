import Logger from "../src/layers/utils/logger";
import { environment } from "../src/layers/environment";
import { populateRecipes } from "../src/layers/service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    const envVariables = await environment();

    await populateRecipes();

    logger.info({ message: "Recipe Upserts Complete ..."});
};
