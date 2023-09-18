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
            const { Plaintext } = await kms.decrypt(decryptParams).promise();

            const decryptedData = JSON.parse(Plaintext?.toString('binary') ?? "");

            const envVariables: EnvVariables = {
                HOST: decryptedData.host,
                USER: decryptedData.user,
                PASS: decryptedData.pass,
                DB: decryptedData.db,
                TOKEN_SECRET: decryptedData.tokensecret,
                REFRESH_TOKEN_SECRET: decryptedData.refreshtokensecret
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
                TOKEN_SECRET: process.env.TOKEN_SECRET!,
                REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!
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

// let envVariables: EnvVariables;

// /*
// ** Checking truthyness of EncryptedSecrets since it's specific
// ** to a template/local-lambbda invoke
// */
// if (process.env.EncryptedSecrets) {

//     const CiphertextBlob = process.env.EncryptedSecrets;

//     const decryptParams = {
//         CiphertextBlob: Buffer.from(CiphertextBlob, 'base64'),
//         KeyId: process.env.KmsResourceKey
//     };

//     kms.decrypt(decryptParams, (error, data) => {
//         if (error) {
//             logger.error({ error, funcName: "Decrypting ENV Variables" });
//         } else {
//             console.log("Made it in the decrypt");
//             const decryptedData = JSON.parse(data.Plaintext?.toString('binary') ?? "");

//             console.log("data -> ", JSON.stringify(decryptedData));

//             envVariables = {
//                 HOST: decryptedData.host,
//                 USER: decryptedData.user,
//                 PASS: decryptedData.pass,
//                 DB: decryptedData.db,
//                 TOKEN_SECRET: decryptedData.tokensecret,
//                 REFRESH_TOKEN_SECRET: decryptedData.refreshtokensecret
//             }

//             logger.info({ message: "App Using Template Environment Variables" });
//         }
//     });

// } else {            
//      console.log("Made it in the wrong place");

//     /*
//     ** If EncryptedSecrets is false, the ENV variables are being extracted
//     ** from a dotenv file
//     */   
//     envVariables = {
//         HOST: process.env.HOST!,
//         USER: process.env.USER!,
//         PASS: process.env.PASS!,
//         DB: process.env.DB!,
//         TOKEN_SECRET: process.env.TOKEN_SECRET!,
//         REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!
//     }
//     logger.info({ message: "App Using Local Environment Variables" });
// }

//  export {envVariables};
