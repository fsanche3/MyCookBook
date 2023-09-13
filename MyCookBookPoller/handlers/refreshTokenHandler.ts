import { deleteTokens } from "../layers/src/repository/authRepo";
import Logger from "../layers/src/utils/logger";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Deletion of Refresh Tokens ..." });

    await deleteTokens();

    logger.info({ message: "Deletion of Refresh Tokens Complete ..."});
};
