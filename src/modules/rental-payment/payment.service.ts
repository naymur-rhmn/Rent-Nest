import Stripe from "stripe"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"
import { PaymentStatus, RentalStatus, Role } from "../../../generated/prisma/enums"
import { handleCheckoutCompleted, handleCheckoutExpired } from "./payment.utils"
// import { PaymentStatus } from "../../../generated/prisma/enums"

const createPaymentSession = async (userId: string, rentalRequestId: string) => {
    const transactionResult = await prisma.$transaction(async (tx) => {
        const rentalRequest = await tx.rental_Request.findUniqueOrThrow({
            where: {
                id: rentalRequestId, 
                tenantId: userId,
            },
            include: {
                tenant: true, 
                property: true
            }
        }) 

        if(rentalRequest.status !== RentalStatus.APPROVED) {
            throw new Error("You are not APPROVED yet!")
        }

        let stripeCustomerId = rentalRequest.tenant?.stripeCustomerId
        const productDescription = rentalRequest.property?.description.slice(0, 250)

        if(!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: rentalRequest.tenant.email,
                name: rentalRequest.tenant.name,
                metadata: {
                    userId: rentalRequest.tenant.id
                }
            })

            stripeCustomerId = customer.id

            await tx.user.update({
                where: {
                    id: rentalRequest.tenant.id
                },
                data: {
                    stripeCustomerId
                }
            })
        }
        
        // stripe checkout sessions create 
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: rentalRequest.property.title,
                            description: `${productDescription}...`
                        },
                        unit_amount: Number(rentalRequest.property.rent) * 100, // stripe store amount as cents
                    },
                    quantity: 1,
                }
            ],
            mode : "payment",
            customer : stripeCustomerId,
            payment_method_types : ["card"],
            success_url : `${config.app_url}/payment?success=true`,
            cancel_url: `${config.app_url}/payment?success=false`,
            metadata : {
                userId : rentalRequest.tenant.id,
                rentalRequestId,
                propertyId: rentalRequest.property.id
            }
        })

        return session.url;
    })
    return {
        session_url: transactionResult
    };
}

const handleWebhook = async(payload: Buffer, signature: string) => {
    const endpointSecret = config.stripe_webhook_secret;
 
    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
    )
 
switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            
            await handleCheckoutCompleted(session)

            console.log("Payment succeeded");
            break;
        }

        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            
            await handleCheckoutExpired(session)

            console.warn(`Checkout expired for rentalRequest: ${session.metadata?.rentalRequestId}`);
            break;
        }

        default: console.log(`Unhandled event type: ${event.type}`);
    }
}

const getAllPayments = async(userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if(user && user.role === Role.ADMIN) {
        const payments = await prisma.payment.findMany({
            omit: {
                stripePaymentIntentId: true,
                stripeCustomerId: true,
                currency: true,
                paymentMethod: true,
                paidAt: true,
                updatedAt: true
            }
        })
        return payments;
    }

    if(user && user.role === Role.LANDLORD) {
        const payments = await prisma.payment.findMany({
            where: {
                rentalRequest: {
                    property: {
                        landlordId: userId,
                    },
                },
            },
            omit: {
                stripePaymentIntentId: true,
                stripeCustomerId: true,
                currency: true,
                paymentMethod: true,
                paidAt: true,
                updatedAt: true
            }
        
        });
        return payments 
    }

    if(user && user.role === Role.TENANT) {
        const payments = await prisma.payment.findMany({
            where: {
                rentalRequest: {
                    tenantId: userId
                },
            },
            omit: {
                stripePaymentIntentId: true,
                stripeCustomerId: true,
                currency: true,
                paymentMethod: true,
                paidAt: true,
                updatedAt: true
            }
        })
        return payments
    }
    else {
        throw new Error("You are not Authorized")
    }
}


const getPaymentDetails = async (id: string) => {
    return await prisma.payment.findUniqueOrThrow({
        where: {
            id
        }
    })
}



export const paymentService = {
    createPaymentSession,
    handleWebhook,
    getAllPayments,
    getPaymentDetails
}