import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../config"

const createToken = (payload : JwtPayload, secret: string, expires: SignOptions) => {
    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn: expires
        } as SignOptions
    )

    return token;
}

export const jwtUtils = {
    createToken,
    // verifyToken
}