import { createLogger, format, transports } from 'winston';

export default class Logger {

    private static loggerUtil: Logger;
    private static logger: any;

    public static getInstance(): Logger {
        if (!Logger.loggerUtil) {
            Logger.loggerUtil = new Logger();
            this.logger = this.getLogger();
        }
        return Logger.logger;
    }
    private static getLogger() {
        return createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.json(),
                format.prettyPrint(),
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize({
                            all: true,
                        }),
                        format.printf(
                            (info) => `${info.timestamp} [${info.level}]: ${info.message}
                            ${info.funcName ? "Function: "+info.funcName: ''}
                            ${info.obj ? JSON.stringify(info.obj) : ''}`,
                        ),
                    ),
                }),
            ],
        });
    }
    info({ message, obj }: { message: string; obj?: any }) {
        Logger.logger.log('info', message, obj);
    }
    warn({ message, obj }: { message: string; obj?: any }) {
        Logger.logger.log('warn', message, obj);
    }
    error({ error, funcName }: { error: any; funcName: string }) {
        Logger.logger.log('error', error, funcName);
    }
}