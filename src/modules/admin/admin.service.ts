import { prisma } from "../../lib/prisma"
import { updateUserStatusValidator } from "../../validator/schema"
import { IUserStatus } from "./admin.interface"

const getAllUsers = async () => {
    return await prisma.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

const updateUserStatus = async(payload : IUserStatus,userId: string) => {
    const validate = updateUserStatusValidator.safeParse(payload)

    if(!validate.success) {
        throw new Error(validate.error.issues[0]?.message)
    }
    const {...validatedData} = validate.data

    await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
    })

    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...validatedData
        }
        
    })
}

const getAllProperties = async () => {
    return await prisma.property.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

const getAllRentalRequests = async () => {
    return await prisma.rental_Request.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}


export const AdminService = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
}