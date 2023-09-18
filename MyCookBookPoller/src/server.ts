import AWS from "aws-sdk"
import { environment } from "./src/environment";
import { clearRecipes } from "./src/service/spoonService";
import Logger from "./src/utils/logger";

/*
**
** TESTING ONLY
** FILE IS ONLY FOR LOCAL SERVER SPIN-UP'S
**
*/

const sqs = new AWS.SQS({ apiVersion: '2012-11-05', region: "us-east-1" });

const logger = Logger.getInstance();

logger.info({ message: "Initiating Polling ..." });

const start = async () => {
    try {
        const envVariables = await environment();

        await clearRecipes();

        logger.info({ message: "Polling Complete ..." });

    } catch (error) {
        logger.error({ error, funcName: "Local invoke" });
    }
}

start();

