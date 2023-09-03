import { pollForRecipes } from "../service/spoonService";
import Logger from "../utils/logger";
import { environment } from "../environment";
import AWS from "aws-sdk"

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    const envVariables = await environment();
     
    logger.info({ message: "Initiating Polling ..." });

    await pollForRecipes({envVariables});

    const params = {
        MessageBody: `Deleted Recipes at ${Date()}`,
        QueueUrl: envVariables.QUEUE_URL
      }
    
    await sqs.sendMessage(params).promise();

    logger.info({ message: "Polling Complete ..." });
};
