import UserRepository from "../repository/userRepository";
import Logger from "../utils/logger";
import { autoInjectable } from "tsyringe"
import bcrypt from 'bcrypt';
import { User } from "../types";

const logger = Logger.getInstance();

@autoInjectable()
export default class AuthService {

    userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async verifyAuth(body: { username: string, password: string }): Promise<boolean> {
        try {
            const userList: User[] = await this.userRepo.includesUsername(body.username);

            if (!userList.length) return false;

            const validPassword: boolean = await bcrypt.compare(body.password, userList[0].password);

            return validPassword ? true : false;

        } catch (error) {
            logger.error({ error: error, funcName: "verifyAuth Service" });
            throw error;
        }
    }
}