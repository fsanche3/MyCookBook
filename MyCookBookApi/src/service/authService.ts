import { UserRepository, AuthRepository } from "../repository";
import Logger from "../utils/logger";
import { AccessTokens, User } from "../types";
import { autoInjectable } from "tsyringe"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { envVariables } from "../environment/environment";

const logger = Logger.getInstance();

@autoInjectable()
export default class AuthService {

    userRepo: UserRepository;
    authRepo: AuthRepository;

    constructor(userRepo: UserRepository, authRepo: AuthRepository) {
        this.userRepo = userRepo;
        this.authRepo = authRepo;
    }

    async verifyAuth(body: { username: string, password: string }): Promise<AccessTokens | boolean> {
        try {
            const userList: User[] = await this.userRepo.includesUsername(body.username);

            if (!userList.length) return false;

            const validPassword: boolean = await bcrypt.compare(body.password, userList[0].password);

            if (!validPassword) return false;

            const token = jwt.sign({ exp: 60, data: body.username }, (envVariables.TOKEN_SECRET ?? "token_secret"));

            const refreshToken = jwt.sign({ exp: 120, data: body.username }, (envVariables.REFRESH_TOKEN_SECRET ?? "refresh_secret"));

            const tokens: AccessTokens = { token, refreshToken };

            await this.authRepo.upsertRefreshToken(tokens.refreshToken);

            return tokens;

        } catch (error) {
            logger.error({ error: error, funcName: "verifyAuth Service" });
            throw error;
        }
    }

    // async verifyToken(body: { username: string, password: string }): Promise<boolean> {
    //     try {
    //         const userList: User[] = await this.userRepo.includesUsername(body.username);

    //         if (!userList.length) return false;

    //         const validPassword: boolean = await bcrypt.compare(body.password, userList[0].password);

    //         return validPassword ? true : false;

    //     } catch (error) {
    //         logger.error({ error: error, funcName: "verifyToken Service" });
    //         throw error;
    //     }
    // }

    // async getToken(body: { username: string, password: string }): Promise<boolean> {
    //     try {
    //         const userList: User[] = await this.userRepo.includesUsername(body.username);

    //         if (!userList.length) return false;

    //         const validPassword: boolean = await bcrypt.compare(body.password, userList[0].password);

    //         return validPassword ? true : false;

    //     } catch (error) {
    //         logger.error({ error: error, funcName: "getToken Service" });
    //         throw error;
    //     }
    // }
}

