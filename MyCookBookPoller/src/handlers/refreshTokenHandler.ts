import { deleteTokens } from "../repository/authRepo";
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Deletion of Refresh Tokens ..." });

    await deleteTokens();

    logger.info({ message: "Deletion of Refresh Tokens Complete ..."});
};
