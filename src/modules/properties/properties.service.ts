import { prisma } from "../../lib/prisma"

const getAllProperties = async () => {
    const properties = await prisma.property.findMany({
        where: {
            isDeleted: false
        },
        include: {
            category: true
        }
    });
    return properties;
};

const getPropertyById = async (propertyId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            isDeleted: false,
            id: propertyId
        },
        include: {
            category: true
        }
    });
    return property;
};

export const propertiesService = {
    getAllProperties,
    getPropertyById
}