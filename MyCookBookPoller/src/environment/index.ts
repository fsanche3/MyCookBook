import AWS from 'aws-sdk';
import Logger from '../utils/logger';
import { EnvVariables } from '../types';

const logger = Logger.getInstance();

const kms = new AWS.KMS({
    region: 'us-east-1'
});

export const environment = async (): Promise<EnvVariables> => {
    try {
        /*
        ** Checking truthyness of EncryptedSecrets since it's specific
        ** to a template/local-lambbda invoke
        */
        if (process.env.EncryptedSecrets) {

            const CiphertextBlob = process.env.EncryptedSecrets;

            const decryptParams = {
                CiphertextBlob: Buffer.from(CiphertextBlob, 'base64'),
                KeyId: process.env.KmsResourceKey
            };
            const data = await kms.decrypt(decryptParams).promise();

            const decryptedData = JSON.parse(data.Plaintext?.toString('binary') ?? "");

            const envVariables: EnvVariables = {
                HOST: decryptedData.host,
                USER: decryptedData.user,
                PASS: decryptedData.pass,
                DB: decryptedData.db,
                SPOON_API_URL: decryptedData.spoonapiurl,
                SPOON_API_KEY: decryptedData.spoonkey,
                QUEUE_URL: decryptedData.queueurl
            }

            return envVariables;
        } else {
            /*
            ** If EncryptedSecrets is false, the ENV variables are being extracted
            ** from a dotenv file
            */
            const envVariables: EnvVariables = {
                HOST: process.env.HOST!,
                USER: process.env.USER!,
                PASS: process.env.PASS!,
                DB: process.env.DB!,
                SPOON_API_URL: process.env.SPOON_API_URL!,
                SPOON_API_KEY: process.env.SPOON_API_KEY!,
                QUEUE_URL: process.env.QUEUE_URL!
            }
            logger.info({ message: "App Using Local Environment Variables" });
            return envVariables;
        }
    }
    catch (error) {
        logger.error({ error, funcName: "Get Environment Function" });
        throw Error("Application Environment Variables Inaccessible");
    }

}

