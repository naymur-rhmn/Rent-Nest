import bcrypt from "bcryptjs";
import { UPayload } from "./auth.interface"
import config from "../../config";
import { prisma } from "../../lib/prisma";


const userRegistration = async (payload : UPayload) => {
    const {name, email, password, phone, role, occupation, age, profileImage, country, state, status } = payload;

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const userExist = await prisma.user.findUnique({
        where : {email : email}
    })

    if(userExist) {
        throw new Error( "User already exists in DB")
    }

    const createdUser = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
            phone,
            role,
            occupation,
            age,
            profileImage,
            country,
            state,
            status 
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email,
        },
        omit: {
            password: true
        },    
    })

    return user;
}

export const authService = {
    userRegistration
}