import { clearRecipes } from "../layers/nodejs/src/service/spoonService";
import Logger from "../layers/nodejs/src/utils/logger";
import { environment } from "../layers/nodejs/src/environment";
import AWS from "aws-sdk"

const sqs = new AWS.SQS({apiVersion: '2012-11-05', region: "us-east-1"});

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    const envVariables = await environment();
     
    logger.info({ message: "Initiating Recipe Deletion ..." });

    await clearRecipes();

    const params = {
        MessageBody: `Deleted Recipes at ${Date()}`,
        QueueUrl: envVariables.QUEUE_URL
      }
    
    const result = await sqs.sendMessage(params).promise();

    logger.info({ message: "Recipe Deletion Complete ...", obj: result});
};
