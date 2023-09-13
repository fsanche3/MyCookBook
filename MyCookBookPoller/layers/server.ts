import AWS from "aws-sdk"
import { environment } from "./src/environment";
import { pollForRecipes } from "./src/service/spoonService";
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

        const params = {
            QueueUrl: envVariables.QUEUE_URL,
        }

        const {Messages} = await sqs.receiveMessage(params).promise();

        const deleteParams = {
            QueueUrl: envVariables.QUEUE_URL,
            ReceiptHandle: Messages![0].ReceiptHandle!
        }

        await sqs.deleteMessage(deleteParams).promise();

        console.log("resp --> ", JSON.parse(JSON.stringify(Messages)));

    } catch (error) {
        logger.error({ error, funcName: "Local invoke" });
    }
}

start();

logger.info({ message: "Polling Complete ..." });
