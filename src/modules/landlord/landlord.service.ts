import { prisma } from "../../lib/prisma"
import { IProperty } from "./landlord.interface"

const createProperty = async(payload: IProperty, landlordId: string) => {
    await prisma.category.findUniqueOrThrow({
        where: {
            id: payload.categoryId,
        },
    });

    const isPropertyExist = await prisma.property.findUnique({
        where : {
            unique_landlord_property: {
                landlordId,
                title: payload.title.trim().toLowerCase(),
                address: payload.address.trim().toLowerCase(),
            },
        }
    })

    if(isPropertyExist) {
        throw new Error("Property already exists!")
    }
    
    const property = await prisma.property.create({
        data: {
            ...payload,
            title: payload.title.trim().toLowerCase(),
            address: payload.address.trim().toLowerCase(),
            landlordId
        },
        include: {
            category: true,
        }
    })

    return property
}
const updateProperty = async() => {

}
const deleteProperty = async() => {

}
const getAllRentalRequest = async() => {

}
const approveOrRejectRentalReq = async() => {

}


export const landlordService = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}