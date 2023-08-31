import { getDB } from "../database";
import { DatabaseRefreshToken } from "../types";
import Logger from "../utils/logger";

const { db } = getDB();
const logger = Logger.getInstance();

export default class AuthRepository {

    async getRefreshToken(body: { token: string }): Promise<DatabaseRefreshToken> {
        try {
            const tokenList: DatabaseRefreshToken[] = await db.any(`SELECT * FROM refreshtoken where rtoken = '${body.token}'`)

            return tokenList[0];

        } catch (error) {
            logger.error({ error: error, funcName: "getRefreshToken Repo" });
            throw error;
        }
    }

    async upsertRefreshToken(refreshToken: string, userId: number, attempts?: number): Promise<void> {
        try {
            await db.any(`INSERT INTO refreshtoken VALUES (default, '${refreshToken}', ${userId},
            ${attempts ?? 0})`);

        } catch (error) {
            logger.error({ error: error, funcName: "upsertRefreshToken Repo" });
            throw error;
        }
    }

    async deleteRefreshToken(userId: number): Promise<void> {
        try {
            await db.any(`DELETE FROM refreshtoken WHERE appuser = ${userId}`);

        } catch (error) {
            logger.error({ error: error, funcName: "deleteRefreshToken Repo" });
            throw error;
        }
    }
}