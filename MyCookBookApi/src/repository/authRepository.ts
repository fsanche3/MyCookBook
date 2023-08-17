import { getDB } from "../database";
import { User } from "../types";
import Logger from "../utils/logger";

const { db } = getDB();
const logger = Logger.getInstance();

export default class AuthRepository {

    // async getRefreshToken(username: string): Promise<User[]> {
    //     try {
    //         const userList: User[] = await db.any(`SELECT * FROM CookBookUser WHERE username = '${username}'`);
            
    //         return userList;
    //     } catch (error) {
    //         logger.error({ error: error, funcName: "getRefreshToken Repo" });
    //         throw error;
    //     }
    // }

    // async upsertRefreshToken(refreshToken: string): Promise<void> {
    //     try {
    //        console.log("Pretending to save: "+ refreshToken);
    //     } catch (error) {
    //         logger.error({ error: error, funcName: "upsertRefreshToken Repo" });
    //         throw error;
    //     }
    // }

    async deleteRefreshToken({ username, password }: { username: string, password: string }): Promise<void> {
        try {

        await db.any(`INSERT INTO CookBookUser VALUES (default, '${username}', '${password}')`);

        } catch (error) {
            logger.error({ error: error, funcName: "deleteRefreshToken Repo" });
            throw error;
        }
    }
}