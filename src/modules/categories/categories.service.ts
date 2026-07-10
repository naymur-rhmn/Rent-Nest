import { prisma } from "../../lib/prisma";
import { ICategory } from "./categories.interface"

const createCategories = async(payload: ICategory ) => {  
    const normalizedName = payload.name.trim().toLowerCase();

    const existingCategory = await prisma.category.findUnique({
        where: {
            name: normalizedName,
        },
    });

    if (existingCategory) {
        throw new Error("Category already exists.");
    }

    const newCategory = await prisma.category.create({
        data: {
            name: normalizedName
        },
    });

    return newCategory
}

const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    })
    return categories;
}

const deleteCategories = async (id : string) => {
    const category = await prisma.category.findUniqueOrThrow({
        where: {
        id,
        },
        include: {
        properties: true,
        },
    });

    if (category.properties.length > 0) {
        throw new Error(
        "Cannot delete category because properties are assigned to it."
        );
    }

    const deletedCategory = await prisma.category.delete({
        where : {id}
    })
    return deleteCategories
}

export const categoriesService = {
    createCategories,
    getAllCategories,
    deleteCategories
}