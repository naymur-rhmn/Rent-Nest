import { z } from "zod"; 
import { PropertyStatus, RentalType, Role } from "../../generated/prisma/enums";

export const authRegisterValidator = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(100, { message: "Name must be no more than 100 characters." }),

    email: z.email({
        message: "Please enter a valid email address.",
    }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(100, { message: "Password must be no more than 100 characters." }),

    phone: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{7,14}$/, {
            message: "Please enter a valid phone number.",
        }),

    age: z.coerce
    .number()
    .int()
    .min(18)
    .max(100).optional(),

    occupation: z
        .string()
        .trim()
        .min(3, { message: "Occupation must be at least 3 characters long." })
        .max(100, { message: "Occupation must be no more than 100 characters." }).optional(),

    country: z
        .string()
        .trim()
        .min(2, { message: "Country is required." }).optional(),

    state: z
        .string()
        .trim()
        .min(2, { message: "State is required." }).optional(),

    profileImage: z.url({
        message: "Please enter a valid email image link.",
    }).optional(),

    role: z
    .string()
    .transform(value => value.toUpperCase())
    .pipe(z.enum([Role.TENANT, Role.LANDLORD]))
    .optional()
});


export const authLoginValidator = z.object({
    email: z.email({
        message: "Please enter a valid email address.",
    }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(100, { message: "Password must be no more than 100 characters." }),
})

 
export const createPropertyValidator = z.object({
    categoryId: z
        .string(),

    title: z
        .string()
        .trim()
        .min(5, { message: "Title must be at least 5 characters." })
        .max(255, { message: "Title must not exceed 255 characters." }),

    description: z
        .string()
        .trim()
        .min(20, { message: "Description must be at least 20 characters." }),

    rent: z
        .coerce
        .number()
        .positive({ message: "Rent must be greater than 0." }),

    bedrooms: z
        .coerce
        .number()
        .int()
        .min(0)
        .optional(),

    bathrooms: z
        .coerce
        .number()
        .int()
        .min(0)
        .optional(),

    area: z
        .coerce
        .number()
        .positive()
        .optional(),

    gMapLocation: z.url({ message: "Google Map location must be a valid URL." })
        .optional(),

    address: z
        .string()
        .trim()
        .min(5, { message: "Address is required." }),

    city: z
        .string()
        .trim()
        .min(2, { message: "City is required." }),

    division: z
        .string()
        .trim()
        .min(2, { message: "Division is required." }),

    country: z
        .string()
        .trim()
        .min(2, { message: "Country is required." }),

    rentalType: z
        .string()
        .transform(value => value.toUpperCase())
        .pipe(z.enum([RentalType.MONTHLY, RentalType.YEARLY]))
        .optional(),
    

    availableRentalPeriodMonth: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(60)
        .optional(),
});