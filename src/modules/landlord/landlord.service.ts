import { PropertyStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { IProperty, IUpdateProperty } from "./landlord.interface"

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
                title: payload.title.trim(),
                address: payload.address.trim(),
            },
        }
    })

    if(isPropertyExist) {
        throw new Error("Property already exists!")
    }
    
    const property = await prisma.property.create({
        data: {
            ...payload,
            title: payload.title.trim() ,
            address: payload.address.trim(),
            landlordId
        },
        include: {
            category: true,
        }
    })

    return property
}
const updateProperty = async(payload : IUpdateProperty, propertyId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id : propertyId
        }
    })
 
    if(
        property.status !== PropertyStatus.AVAILABLE 
        && 
        property.status !==  PropertyStatus.PENDING
    ) {
        throw new Error(`Property must be ${PropertyStatus.AVAILABLE} or ${PropertyStatus.PENDING} state before update`)
    }

    if (payload.categoryId) {
        await prisma.category.findUniqueOrThrow({
            where: {
                id: payload.categoryId,
            },
        });
    }

    const updateProperty = await prisma.property.update({
        where: {
            id: propertyId
        },
        data: {
            ...payload
        },
        include: {
            category: true
        }
    })
    return updateProperty
}
const getAllRentalRequest = async() => {
    
}
const approveOrRejectRentalReq = async() => {
    
}

const deleteProperty = async(propertyId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId,
        },
    });


    if (property.status === PropertyStatus.RENTED) {
        throw new Error("Rented property cannot be deleted");
    }

    if(property.isDeleted) {
        throw new Error("Property already deleted");
    }

    const deletedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
        select: {
            id: true,
            title: true,
            isDeleted: true,
            deletedAt: true  
        }
    }); 
    return deletedProperty;
}

export const landlordService = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}