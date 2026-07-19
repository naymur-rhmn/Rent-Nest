import bcrypt from "bcryptjs";
import { ILoginUser, IRegisterUser } from "./auth.interface"
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { SignOptions } from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";
import { authLoginValidator, authRegisterValidator } from "../../validator/schema";


const userRegistration = async (payload : IRegisterUser) => {
    const validation = authRegisterValidator.safeParse(payload);

    if (!validation.success) {
        throw new Error(validation.error.issues[0]?.message);
    }

    const {name, email, password, phone, role, occupation, age, profileImage, country, state } = validation.data;

    const URole = role?.trim().toUpperCase();

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
            role: URole === "LANDLORD"
                ? "LANDLORD"
                : "TENANT",
            occupation,
            age,
            profileImage,
            country,
            state, 
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

const loginUser = async (payload: ILoginUser) => {
    const validate = authLoginValidator.safeParse(payload)
    
    if(!validate.success) {
        throw new Error(validate.error.issues[0]?.message)
    }
    const {email, password} = validate.data;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const decodedPass = await bcrypt.compare(password, user.password)

    if(!decodedPass) {
        throw new Error("Wrong Credentials!")
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )
    
    
    return {accessToken, refreshToken}
}


const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId 
        },
        omit: {
            password: true,
        },
        // include: {
        //     properties: true,
        //     rentalRequest: true
        // }
    })

    return user
}

export const authService = {
    userRegistration,
    loginUser,
    getUserProfile
}