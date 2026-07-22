 
import { JwtPayload } from "jsonwebtoken";
import { Role, UserStatus } from "../../generated/prisma/enums";
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import { prisma } from "../lib/prisma";
import { NextFunction, Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                name: string,
                email: string,
                role: Role
                status: UserStatus
            }
        }
    }
}

export const auth =  (...requiredRoles: Role[]) => {
    return catchAsync( async(req, res, next) => {
        const token = req.cookies.accessToken ?
            req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer ") ?
            req.headers.authorization.split(" ")[1] :
        req.headers.authorization;
 
        if(!token) {
            throw new Error ("You are not logged in. Please log in to access this resource")
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret)

        if(!verifiedToken.success) {
            throw new Error(verifiedToken.error)
        }

        const {id, name, email, role, status} = verifiedToken.data as JwtPayload

        if(requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to access this resource.")
        }

        const user = await prisma.user.findUnique({
            where: {
                id, 
                email, 
            }
        })
 
        if(!user) {
            throw new Error ("User not found, Please log in again")
        }
        if(user.status === UserStatus.BAN){
            throw new Error("Your account has been banned. Contact support for details.");
        }

        req.user = {
            id,
            name,
            email,
            role,
            status
        }
 
        next()
    })
}

