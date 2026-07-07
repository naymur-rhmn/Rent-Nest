import bcrypt from "bcryptjs";
import { ILoginUser, IRegisterUser } from "./auth.interface"
import config from "../../config";
import { prisma } from "../../lib/prisma";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";


const userRegistration = async (payload : IRegisterUser) => {
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

const loginUser = async (payload: ILoginUser) => {
    const {email, password} = payload;

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


const getUserProfile = async () => {}

export const authService = {
    userRegistration,
    loginUser,
    getUserProfile
}