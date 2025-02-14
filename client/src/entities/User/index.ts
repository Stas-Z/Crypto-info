export { useInitAuthData } from './model/api/userApi'

export {
    getUserAuthData,
    getUserInited,
} from './model/selectors/getUserAuthData/getUserAuthData'

export { userReducer, userActions } from './model/slices/userSlice'

export type { UserSchema, User } from './model/types/userSchema'
