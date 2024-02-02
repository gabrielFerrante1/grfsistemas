import { Api } from "./Api"

export type User = {
    id: number,
    name: string,
    email: string
}

export type UserAuth = {
    error: boolean,
    user: {
        id: number,
        name: string,
        email: string,
        token: string
    }
}

export interface ApiPropsVerifyToken extends Api {
    user: User, 
    authorize: boolean
}

export interface ApiPropsLogin extends Api {
    token: string,
    verified_email: boolean,
    user: User
}

export interface ApiPropsRegister extends Api {
    token: string,
    verified_email: boolean 
}

export interface UserLoginSavedsUser extends User { avatar: string }
export interface UserLoginSavedInfo {
    connected: boolean,
    user: UserLoginSavedsUser
}
export interface ApiPropsUserLoginSaveds extends Api {
    users: UserLoginSavedInfo[]
}