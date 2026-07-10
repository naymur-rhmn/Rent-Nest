import { prisma } from "../../lib/prisma";
import { IRentalRequest } from "./rental.interface"

const submitRentalRequest = async(payload: IRentalRequest, tenantId: string) => {
    const { moveInDate, message, propertyId } = payload;

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
            propertyId,
            tenantId
        }
    });

    return rentalRequest;
};

const getRentalRequests = async(landlordId: string) => {
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
                            email: true
                        }
                    }
                }
            } 
        },
         
    })
    return landlordProperties 
}

const getRentalRequestById = async(id: string) => {
    return prisma.rental_Request.findUniqueOrThrow({
        where: {
            id
        },
        // select: {
        //     id: true,
        //     message: true,
        //     moveInDate: true,
        //     status: true,
        //     tenant: {
        //         select: {
        //             id: true,
        //             name: true,
        //             email: true,
        //             phone: true,
        //             age: true,
        //             occupation: true,
        //             state: true,
        //             country: true,
        //             profileImage: true,
        //         }
        //     }, 
        //     property: {
        //         select: {
        //             id: true,
        //             title: true,
        //             rent: true,
        //             category: {
        //                 select: {
        //                     name: true
        //                 }
        //             }
        //         }
        //     }

        // }
    });
};

export const RentalService = {
    submitRentalRequest,
    getRentalRequests,
    getRentalRequestById
}