import UserRepository from "../repository/userRepository";
import Logger from "../utils/logger";
import { autoInjectable } from "tsyringe"
import bcrypt from 'bcrypt';

const logger = Logger.getInstance();

@autoInjectable()
export default class UserService {

    userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async addUser(body: { username: string, password: string }): Promise<boolean> {
        try {
            const userAlreadyExist: boolean = await this.userRepo.includesUsername(body.username);

            if (userAlreadyExist) return false;

            const hash = await bcrypt.hash(body.password, 10);

            await this.userRepo.saveUser({ username: body.username, password: hash });

            return true;

        } catch (error) {
            logger.error({ error: error, funcName: "addUser Service" });
            throw error;
        }
    }
}