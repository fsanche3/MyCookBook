import { clearRecipes } from "../service/spoonService";
import Logger from "../utils/logger";
import { environment } from "../environment";
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
