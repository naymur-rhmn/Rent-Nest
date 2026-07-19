import { z } from "zod"; 
import { RentalType, Role, UserStatus } from "../../generated/prisma/enums";

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
        .pipe(z.enum([Role.TENANT, Role.LANDLORD], {message: `Choose either ${Role.TENANT} or ${Role.LANDLORD}`}))
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
        .string({message: "Category id must be provided"}),

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
        .pipe(z.enum([RentalType.MONTHLY, RentalType.YEARLY], {message: `Choose either ${RentalType.MONTHLY} or ${RentalType.YEARLY}`}))
        .optional(),
    

    availableRentalPeriodMonth: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(60)
        .optional(),
});

export const updatePropertyValidator = z.object({
    categoryId: z
        .string({message: "Category id must be provided"}).optional(),

    title: z
        .string()
        .trim()
        .min(5, { message: "Title must be at least 5 characters." })
        .max(255, { message: "Title must not exceed 255 characters." }).optional(),

    description: z
        .string()
        .trim()
        .min(20, { message: "Description must be at least 20 characters." }).optional().optional(),

    rent: z
        .coerce
        .number()
        .positive({ message: "Rent must be greater than 0." }).optional(),

    bedrooms: z
        .coerce
        .number()
        .int()
        .min(0)
        .optional().optional(),

    bathrooms: z
        .coerce
        .number()
        .int()
        .min(0)
        .optional().optional(),

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
        .min(5, { message: "Address is required." }).optional(),

    city: z
        .string()
        .trim()
        .min(2, { message: "City is required." }).optional(),

    division: z
        .string()
        .trim()
        .min(2, { message: "Division is required." }).optional(),

    country: z
        .string()
        .trim()
        .min(2, { message: "Country is required." }).optional(),

    rentalType: z
        .string()
        .transform(value => value.toUpperCase())
        .pipe(z.enum([RentalType.MONTHLY, RentalType.YEARLY], {message: `Choose either ${RentalType.MONTHLY} or ${RentalType.YEARLY}`}))
        .optional(),
    

    availableRentalPeriodMonth: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(60)
        .optional(),
})

export const createRentalRequestValidator = z.object({
    propertyId: z 
        .uuid({ message: "Invalid property id." }),

    moveInDate: z.coerce
        .date({
            message: "Invalid move-in date.",
        })
        .refine(
            (date) => date > new Date(),
            {
                message: "Move-in date must be in the future.",
            }
        ).optional(),

    message: z
        .string()
        .trim()
        .min(10, {
            message: "Message must be at least 10 characters long.",
        })
        .max(500, {
            message: "Message must not exceed 500 characters.",
        }),

    askingRentMonth: z.coerce
        .number()
        .positive({
            message: "Rent month must be greater than 0.",
        }),
});

export const createReviewValidator = z.object({
    propertyId: z
        .uuid({ message: "Invalid property id." }),

    rating: z.coerce
        .number()
        .int({ message: "Rating must be an integer." })
        .min(1, { message: "Rating must be at least 1." })
        .max(5, { message: "Rating cannot be more than 5." }),

    comment: z
        .string()
        .trim()
        .min(5, { message: "Comment must be at least 5 characters." })
        .max(500, { message: "Comment cannot exceed 500 characters." })
        .optional(),
});

export const updateUserStatusValidator = z.object({
    status: z
        .string()
        .transform(value => value.toUpperCase())
        .pipe(z.enum([UserStatus.BAN, UserStatus.UNBAN], {message: `Choose either ${UserStatus.BAN} or ${UserStatus.UNBAN}`}))

})
