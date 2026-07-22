import { PropertyWhereInput } from "../../../generated/prisma/models";


export interface IPropertiesQuery extends PropertyWhereInput {
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