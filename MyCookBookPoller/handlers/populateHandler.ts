import Logger from "../src/layers/utils/logger";
import { populateRecipes } from "../src/layers/service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    await populateRecipes();

    logger.info({ message: "Recipe Upserts Complete ..."});
};
