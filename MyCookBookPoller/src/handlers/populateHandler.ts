import Logger from "../utils/logger";
import { environment } from "../environment";
import { pollForRecipes } from "../service/spoonService";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Recipe Upserts ..." });

    const envVariables = await environment();

    await pollForRecipes({envVariables});

    logger.info({ message: "Recipe Upserts Complete ..."});
};
