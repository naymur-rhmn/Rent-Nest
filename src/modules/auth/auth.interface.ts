import { Role, UserStatus } from "../../../generated/prisma/enums";

export interface UPayload {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: Role,
    occupation?: string,
    age?: number,
    profileImage?: string,
    country: string,
    state?: string,
    status: UserStatus,
}

// enum Role {
//     LANDLORD,
//     TENANT
// }

// enum UserStatus {
//     BAN,
//     UNBAN
// }