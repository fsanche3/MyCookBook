import { pollForRecipes } from "./service/spoonService";
import Logger from "./utils/logger";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {
    logger.info({ message: "Initiating Polling ..." });
    await pollForRecipes();
    logger.info({ message: "Polling Complete ..." });
};
