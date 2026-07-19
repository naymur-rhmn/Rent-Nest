import { Role, UserStatus } from "../../../generated/prisma/enums";

export interface IRegisterUser {
    name: string,
    email: string,
    password: string,
    phone: string,
    role?: Role,
    occupation?: string,
    age?: number,
    profileImage?: string,
    country?: string,
    state?: string, 
}

export interface ILoginUser {
    email: string, 
    password: string
}

 