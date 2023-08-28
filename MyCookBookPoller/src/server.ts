import { pollForRecipes } from "./service/spoonService";
import Logger from "./utils/logger";

/*
**
** TESTING ONLY
** FILE IS ONLY FOR LOCAL SERVER SPIN-UP'S
**
*/

const logger = Logger.getInstance();

logger.info({ message: "Initiating Polling ..." });

const start = async () => {
    try {
        await pollForRecipes();
    } catch (error) {
        logger.error({ error, funcName: "Local invoke" });
    }
}

start();

logger.info({ message: "Polling Complete ..." });
