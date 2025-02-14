export interface User {
    id: string
    email: string
}

export interface UserSchema {
    currentUser: User
    isAuth: boolean

    _inited: boolean
}
