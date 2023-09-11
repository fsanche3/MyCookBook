import Logger from "../layers/nodejs/src/utils/logger";
import { environment } from "../layers/nodejs/src/environment";
import { pollForRecipes } from "../layers/nodejs/src/service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    const envVariables = await environment();

    await pollForRecipes({envVariables});

    logger.info({ message: "Recipe Upserts Complete ..."});
};
