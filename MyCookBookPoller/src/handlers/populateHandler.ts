import Logger from "../utils/logger";
import { environment } from "../environment";

import AWS from 'aws-sdk';

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const logger = Logger.getInstance();

export const lambdaHandler = async (event: any): Promise<void> => {

    const envVariables = await environment();

    const params = {
        QueueUrl: envVariables.QUEUE_URL,
    }

    const { Messages } = await sqs.receiveMessage(params).promise();

    if (!Messages || Messages.length != 1) {
        logger.warn({ message: "This function should not be invoked" });

    } else {

        const deleteParams = {
            QueueUrl: envVariables.QUEUE_URL,
            ReceiptHandle: Messages[0].ReceiptHandle!
        }

        console.log("Handle ->", Messages[0].ReceiptHandle!);

        await sqs.deleteMessage(deleteParams).promise();
    }
};
