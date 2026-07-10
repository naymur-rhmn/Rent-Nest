import { prisma } from "../../lib/prisma";
import { IRentalRequest } from "./rental.interface"

const submitRentalRequest = async(payload: IRentalRequest, tenantId: string) => {
    const { moveInDate, message, propertyId } = payload;

    await prisma.rental_Request.findUniqueOrThrow({
        where: {
            rental_tenant_property_unique: {
                tenantId,
                propertyId
            }
        }
    })

    const rentalRequest = await prisma.rental_Request.create({
        data: {
            moveInDate,
            message,
            propertyId,
            tenantId
        }
    });

    return rentalRequest;
};

const getRentalRequests = async() => {
    return prisma.rental_Request.findMany();
};

const getRentalRequestById = async(id: string) => {
    return prisma.rental_Request.findUniqueOrThrow({
        where: {
            id
        }
    });
};

export const RentalService = {
    submitRentalRequest,
    getRentalRequests,
    getRentalRequestById
}