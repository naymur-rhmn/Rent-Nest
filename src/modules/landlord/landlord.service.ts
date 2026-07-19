import { PropertyStatus, RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { createPropertyValidator } from "../../validator/schema";
import { IApproveReject, IProperty, IUpdateProperty } from "./landlord.interface"

const createProperty = async(payload: IProperty, landlordId: string) => {
    const validate = createPropertyValidator.safeParse(payload)

    if(!validate.success) {
        throw new Error(validate.error.issues[0]?.message)
    }

    const {...properyData} = validate.data
 

    await prisma.category.findUniqueOrThrow({
        where: {
            id: properyData.categoryId,
        },
    });

    const isPropertyExist = await prisma.property.findUnique({
        where : {
            unique_landlord_property: {
                landlordId,
                title: properyData.title.trim(),
                address: properyData.address.trim(),
            },
        }
    })

    if(isPropertyExist) {
        throw new Error("Property already exists!")
    }
    
    const property = await prisma.property.create({
        data: {
            ...properyData,
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

const getAllRentalRequest = async(landlordId: string) => {
    const landlordProperties = await prisma.property.findMany({
        where: {
            landlordId,
            isDeleted: false
        },
        select: {
            id: true,
            title: true, 
            rentalRequest: {
                select: {
                    id: true,
                    message: true,
                    moveInDate: true,
                    status: true,
                    tenant: {
                        select: {
                           id: true,
                            name: true,
                            email: true,
                            phone: true,
                            age: true,
                            occupation: true,
                            state: true,
                            country: true,
                            profileImage: true,
                        }
                    }
                }
            } 
        },
         
    })
    return landlordProperties 
}

const approveOrRejectRentalReq = async(payload: IApproveReject,rentalId: string) => {
    const status = payload.status.trim().toUpperCase();
    
    await prisma.rental_Request.findUniqueOrThrow({
        where: {
            id: rentalId
        }
    })

    
    if(status === RentalStatus.APPROVED || status === RentalStatus.PENDING || status === RentalStatus.REJECTED) { 
        const result = await prisma.rental_Request.update({
            where: {
                id: rentalId
            },
            data: {
                status: status
            }
        })
        return result
    } else {
        throw new Error("Provide correct input form")
    }
    
}

const removeProperty = async(propertyId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId,
        },
    });

    if (property.status === PropertyStatus.RENTED) {
        throw new Error("Rented property cannot be removed.");
    }

    if(property.isDeleted) {
        throw new Error("Property already removed.");
    }

    const removedProperty = await prisma.property.update({
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
    return removedProperty;
}

export const landlordService = {
    createProperty,
    updateProperty,
    removeProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}