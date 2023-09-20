import Logger from "../src/layers/utils/logger";

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    logger.info({ message: "Initiating Incident Report ..." });


    logger.info({ message: "Incident Report Complete ..."});
};
