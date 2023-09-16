import AWS from 'aws-sdk';
import Logger from '../utils/logger';
import { EnvVariables } from '../types';

const logger = Logger.getInstance();

const kms = new AWS.KMS({
    region: 'us-east-1'
});

let envVariables: EnvVariables;

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

    kms.decrypt(decryptParams, (error, data) => {
        if (error) {
            logger.error({ error, funcName: "Decrypting ENV Variables" });
        } else {

            const decryptedData = JSON.parse(data.Plaintext?.toString('binary') ?? "");

            envVariables = {
                HOST: decryptedData.host,
                USER: decryptedData.user,
                PASS: decryptedData.pass,
                DB: decryptedData.db,
                TOKEN_SECRET: decryptedData.tokensecret,
                REFRESH_TOKEN_SECRET: decryptedData.refreshtokensecret
            }

            logger.info({ message: "App Using Template Environment Variables" });
        }
    });

} else { 
    /*
    ** If EncryptedSecrets is false, the ENV variables are being extracted
    ** from a dotenv file
    */   
    envVariables = {
        HOST: process.env.HOST!,
        USER: process.env.USER!,
        PASS: process.env.PASS!,
        DB: process.env.DB!,
        TOKEN_SECRET: process.env.TOKEN_SECRET!,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!
    }
    logger.info({ message: "App Using Local Environment Variables" });
}

 export {envVariables};
