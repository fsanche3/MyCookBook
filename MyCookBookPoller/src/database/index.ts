import pgPromise from 'pg-promise';
import { envVariables } from '../environment';

const pgp = pgPromise();

export function createSingleton<T>(name: string, create: () => T): T {
    const s = Symbol.for(name);
    let scope = (global as any)[s];
    if (!scope) {
        scope = {...create()};
        (global as any)[s] = scope;
    }
    return scope;
}

interface IDatabaseScope {
    db: pgPromise.IDatabase<any>;
    pgp: pgPromise.IMain;
}

export function getDB(): IDatabaseScope {
    return createSingleton<IDatabaseScope>('my-app-db-space', () => {
        return {
            db: pgp(`postgres://${envVariables.USER}:${envVariables.PASS}@${envVariables.HOST}:5432/${envVariables.DB}`
            ),
            pgp
        };
    });
}
