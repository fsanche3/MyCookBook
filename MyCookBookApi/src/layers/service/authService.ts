import { UserRepository, AuthRepository } from "../repository";
import Logger from "../utils/logger";
import { AccessTokens, DatabaseRefreshToken, User } from "../types";
import { injectable } from "tsyringe"
import bcrypt from 'bcrypt'
import { createToken } from "../utils/helper";

const logger = Logger.getInstance();

@injectable()
export default class AuthService {
    constructor(private userRepo: UserRepository, private authRepo: AuthRepository) {
    }

    async verifyAuth(body: { username: string, password: string }): Promise<AccessTokens | boolean> {
        try {
            const userList: User[] = await this.userRepo.includesUsername(body.username);
            if (!userList.length) return false;

            const validPassword: boolean = await bcrypt.compare(body.password, userList[0].password);
            if (!validPassword) return false;

            const token = createToken({ refreshToken: false, userId: userList[0].id });

            const refreshToken = createToken({ refreshToken: true, userId: userList[0].id });

            const tokens: AccessTokens = { token, refreshToken };

            await this.authRepo.upsertRefreshToken(tokens.refreshToken, userList[0].id);

            return tokens;

        } catch (error) {
            logger.error({ error: error, funcName: "verifyAuth Service" });
            throw error;
        }
    }

    async getRefreshToken(body: { token: string }): Promise<string> {
        try {
            const refreshTokenObj: DatabaseRefreshToken = await this.authRepo.getRefreshToken(body);

            refreshTokenObj.attempts ?? 0;

            let token: string = "";

            if (refreshTokenObj.rtoken && refreshTokenObj.attempts < 2) {
                
                await this.authRepo.deleteRefreshToken(refreshTokenObj.appuser);

                token = createToken({ refreshToken: true, userId: refreshTokenObj.appuser });

                await this.authRepo.upsertRefreshToken(token, refreshTokenObj.appuser,
                    refreshTokenObj.attempts + 1);
            }

            return token;

        } catch (error) {
            logger.error({ error: error, funcName: "getToken Service" });
            throw error;
        }
    }

    async removeRefreshTokensFromDb(body: { userId: number }) {
        try {
            await this.authRepo.deleteRefreshToken(body.userId);

        } catch (error) {
            logger.error({ error: error, funcName: "removeRefreshTokenFromDb Service" });
            throw error;
        }
    }

}

