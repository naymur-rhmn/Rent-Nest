import { prisma } from "../../lib/prisma";
import { ICategory } from "./categories.interface"


const createCategories = async (payload: ICategory | ICategory[]) => {
    const categories = Array.isArray(payload) ? payload : [payload];

    const normalizedCategories = categories.map((category) => ({
        name: category.name.trim().toUpperCase(),
    }));

    // Remove duplicate names from the request itself
    const uniqueCategories = [
        ...new Map(
            normalizedCategories.map((category) => [category.name, category])
        ).values(),
    ];

    // Find already existing categories
    const existingCategories = await prisma.category.findMany({
        where: {
            name: {
                in: uniqueCategories.map((category) => category.name),
            },
        },
        select: {
            name: true,
        },
    });

    const existingNames = new Set(
        existingCategories.map((category) => category.name)
    );

    const categoriesToCreate = uniqueCategories.filter(
        (category) => !existingNames.has(category.name)
    );

    if (categoriesToCreate.length === 0) {
        throw new Error("All categories already exist.");
    }

    await prisma.category.createMany({
        data: categoriesToCreate,
    });

    return await prisma.category.findMany({
        where: {
            name: {
                in: categoriesToCreate.map((category) => category.name),
            },
        },
    });
};


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