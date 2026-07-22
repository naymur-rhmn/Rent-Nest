import { PropertyStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { createRentalRequestValidator } from "../../validator/schema";
import { IRentalRequest } from "./rental.interface"

const submitRentalRequest = async(payload: IRentalRequest, tenantId: string) => {
    const validate = createRentalRequestValidator.safeParse(payload)

    if(!validate.success) {
        throw new Error(validate.error.issues[0]?.message)
    }
    const { message, askingRentMonth, moveInDate, propertyId } = validate.data;

    const property = await prisma.property.findFirstOrThrow({
        where: {
            id: propertyId
        }
    })

    if(property.status !== PropertyStatus.AVAILABLE) {
        throw new Error("The property is not available for rentals")
    }


    const existingRequest = await prisma.rental_Request.findFirst({
        where: {
            tenantId,
            propertyId
        }
    });


    if (existingRequest) {
        throw new Error("A rental request for this property and tenant already exists.");
    }

    const rentalRequest = await prisma.rental_Request.create({
        data: {
            moveInDate,
            message,
            askingRentMonth,
            propertyId,
            tenantId
        }
    });

    return rentalRequest;
};

const getRentalRequests = async(tenantId: string) => {
    const rentalRequests = await prisma.rental_Request.findMany({
        where: {
            tenantId
        },
        select: { 
            id: true,
            moveInDate: true,
            message: true,
            status: true,
            property: {
                select: {
                    id: true,
                    title: true,
                    rent: true, 
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            },
        }
         
    })
    return rentalRequests 
}

const getRentalRequestById = async(id: string) => {
    console.log(id)
    return prisma.rental_Request.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            message: true,
            moveInDate: true,
            status: true,
            tenant: false, 
            property: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    rent: true,
                    address: true,
                    city: true,
                    country: true,
                    division: true,
                    bedrooms: true,
                    bathrooms: true,
                    status: true, 
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }

        }
    });
};

export const RentalService = {
    submitRentalRequest,
    getRentalRequests,
    getRentalRequestById
}