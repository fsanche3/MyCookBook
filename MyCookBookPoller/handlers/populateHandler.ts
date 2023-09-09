import Logger from "../src/nodejs/utils/logger";
import { environment } from "../src/nodejs/environment";
import { pollForRecipes } from "../src/nodejs/service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    const envVariables = await environment();

    await pollForRecipes({envVariables});

    logger.info({ message: "Recipe Upserts Complete ..."});
};
