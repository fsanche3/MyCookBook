import { string } from "yargs";
import UserRepository from "../repository/userRepository";
import Logger from "../utils/logger";
import { autoInjectable } from "tsyringe"

const logger = Logger.getInstance();

@autoInjectable()
export default class UserService {

    userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async addUser(body: { username: string, password: string }): Promise<boolean> {
        try {
            const userExist: boolean = await this.userRepo.includesUsername(body.username);

            if (userExist) return false;

            await this.userRepo.saveUser({ username: body.username, password: body.password });

            return true;

        } catch (error) {
            logger.error({ error: error, funcName: "addUser Service" });
            throw error;
        }
    }
}