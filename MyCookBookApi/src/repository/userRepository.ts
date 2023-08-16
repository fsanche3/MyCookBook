import { getDB } from "../database";
import Logger from "../utils/logger";

const { db } = getDB();
const logger = Logger.getInstance();

export default class UserRepository {

    async includesUsername(username: string): Promise<boolean> {
        try {
            const usernameList = await db.any(`SELECT * FROM CookBookUser WHERE username = '${username}'`);

            return (usernameList.length) ? true : false;
        } catch (error) {
            logger.error({ error: error, funcName: "includesUsername Repo" });
            throw error;
        }
    }

    async saveUser({ username, password }: { username: string, password: string }): Promise<void> {
        try {
            
        await db.any(`INSERT INTO CookBookUser VALUES (default, '${username}', '${password}')`);

        } catch (error) {
            logger.error({ error: error, funcName: "saveUser Repo" });
            throw error;
        }
    }
}