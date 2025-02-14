export const AuthType = {
    AUTH: 'Авторизация',
    REG: 'Регистрация',
} as const

export type AuthTypes = ValueOf<typeof AuthType>
