import { getDB } from "../database";
import Logger from "../utils/logger";

const logger = Logger.getInstance();

export const deleteTokens = async (): Promise<void> => {
    try {
        const { db, pgp } = await getDB();

        await db.any(`DELETE FROM refreshtoken WHERE appuser != 0`);

    } catch (error) {
        logger.error({ error: error, funcName: "deleteRefreshToken Repo" });
    }
}