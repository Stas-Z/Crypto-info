export interface IConfig {
    port: number
    secret: string
    exptime: string | number
    refresh: string
    exprefresh: string
    dbUlr: string
    clientUrl: string
    NODE_ENV: string
}

export default () =>
    ({
        port: parseInt(process.env.PORT || '5000', 10),
        dbUlr: process.env.DB_URL,

        secret: process.env.JWT_ACCES_TOKEN_SECRET,
        exptime: process.env.JWT_ACCES_TOKEN_EXPARATION_MS || 60 * 60 * 1000,
        refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
        exprefresh: process.env.JWT_REFRESH_TOKEN_EXPARATION_MS,

        clientUrl: process.env.CLIENT_URL,
        NODE_ENV: process.env.NODE_ENV,
    }) as IConfig
