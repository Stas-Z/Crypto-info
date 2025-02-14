import { AuthTypes } from '../consts/authConsts'

export interface AuthSchema {
    email: string
    password: string
    view: AuthTypes
}
