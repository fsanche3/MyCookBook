import pgPromise from 'pg-promise';

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
            db: pgp(`postgres://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:5432/${process.env.DB}`
            ),
            pgp
        };
    });
}
