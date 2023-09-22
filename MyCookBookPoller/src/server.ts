import AWS from "aws-sdk"
import { environment } from "./layers/environment/index";
import { clearRecipes, populateRecipes } from "./layers/service/spoonService";
import Logger from "./layers/utils/logger";

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
        // await clearRecipes();
        await populateRecipes();

        logger.info({ message: "Polling Complete ..." });

    } catch (error) {
        logger.error({ error, funcName: "Local invoke" });
    }
}

start();

