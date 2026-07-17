import { prisma } from "../../lib/prisma";
import { IRentalRequest } from "./rental.interface"

const submitRentalRequest = async(payload: IRentalRequest, tenantId: string) => {
    const { message, askingRentMonth, moveInDate, propertyId } = payload;

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
            moveInDate: new Date(moveInDate),
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