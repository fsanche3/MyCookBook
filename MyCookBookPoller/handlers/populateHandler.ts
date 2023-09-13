import Logger from "../layers/src/utils/logger";
import { environment } from "../layers/src/environment";
import { pollForRecipes } from "../layers/src/service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    const envVariables = await environment();

    await pollForRecipes({envVariables});

    logger.info({ message: "Recipe Upserts Complete ..."});
};
