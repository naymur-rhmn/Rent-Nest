import { Prisma } from "../../../generated/prisma/client";
import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"

interface IPropertiesQuery extends PropertyWhereInput {
    // title?: string,
    // price?: string,
    // city?: string,
    // division?: string, 

    searchTerm?: string,
    limit?: string,
    page?: string,
    sortBy?: string,
    sortOrder?: string,
    maxRent?: string,
    minRent?: string
}
 

const getAllProperties = async (query: IPropertiesQuery) => {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const properties = await prisma.property.findMany({
        where: {
            isDeleted: false,

            AND: [
                // searching
                query.searchTerm ? {
                    OR: [
                        {
                            title: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            } 
                        },
                        {
                            description: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                        }
                    ]
                } : {},

                // filtering
                query.title ? {
                    title: {
                        contains: query.title as string,
                        mode: "insensitive"
                    }
                } : {},

                query.category ? {
                    category: {
                        name: {
                            contains: query.category as string,
                            mode: "insensitive"
                        }
                    }
                } : {},

                query.minRent ? {
                    rent: {
                        gte: new Prisma.Decimal(query.minRent),
                    },
                } : {},

                query.maxRent ? {
                    rent: {
                        lte: new Prisma.Decimal(query.maxRent),
                    },
                } : {},
                
                query.city ? {
                    city: {
                        contains: query.city as string,
                        mode: "insensitive"
                    }
                } : {},

                query.division ? {
                    division: {
                        contains: query.division as string,
                        mode: "insensitive"
                    }
                } : {}
            ]
        },

         
        // sorting
        orderBy : {
            [sortBy] : sortOrder
        },
        // dynamic pagination
        take: limit,
        skip: skip,

        include: {
            category: true,
            reviews: true
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
            category: true,
            reviews: true
        }
        
    });
    return property;
};

export const propertiesService = {
    getAllProperties,
    getPropertyById
}