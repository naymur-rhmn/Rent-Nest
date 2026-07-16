import Stripe from "stripe"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"
import { PaymentStatus } from "../../../generated/prisma/enums"
// import { PaymentStatus } from "../../../generated/prisma/enums"

const createPaymentSession = async (userId: string, rentalRequestId: string) => {
    const transactionResult = await prisma.$transaction(async (tx) => {

        const rentalRequest = await tx.rental_Request.findUniqueOrThrow({
            where: {
                id: rentalRequestId, 
                tenantId: userId
            },
            include: {
                tenant: true, 
                property: true
            }
        }) 

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
        case "checkout.session.completed":
            const paymentObj: Stripe.Checkout.Session = event.data.object;

            // const checkoutCompleted = async(paymentObj: ) => {
    
            //     const stripeCustomerId = paymentObj.customer as string;
            //     const stripePaymentIntentId = paymentObj.payment_intent as string
            //     const rentalRequestId = paymentObj.metadata?.rentalRequestId as string; 
            //     const amount = Number(paymentObj.amount_total)
            //     const currency = paymentObj.currency as string
            //     const paymentMethod = paymentObj.payment_method_types[0] as string;
            //     const paidAt = new Date(paymentObj.created / 1000)
                
            //     await prisma.payment.upsert({
            //         where: {
            //             rentalRequestId 
            //         },
            //         create: {
            //             rentalRequestId,
            //             stripePaymentIntentId,
            //             stripeCustomerId,
            //             amount,
            //             currency,
            //             paymentMethod,
            //             status: PaymentStatus.SUCCEEDED,
            //             paidAt,
            //         },
            //         update: {
            //             rentalRequestId,
            //             stripePaymentIntentId,
            //             stripeCustomerId,
            //             amount,
            //             currency,
            //             paymentMethod,
            //             status: PaymentStatus.SUCCEEDED,
            //             paidAt,
            //         }
            //     }) 
            // }
            // await checkoutCompleted(paymentObj)
            // Payment successful
            // const paymentObj: Stripe.Checkout.Session = event.data.object;
 
            const stripeCustomerId = paymentObj.customer as string;
            const stripePaymentIntentId = paymentObj.payment_intent as string
            const rentalRequestId = paymentObj.metadata?.rentalRequestId as string; 
            const amount = Number(paymentObj.amount_total)
            const currency = paymentObj.currency as string
            const paymentMethod = paymentObj.payment_method_types[0] as string;
            const paidAt = new Date(paymentObj.created / 1000)
            
            await prisma.payment.upsert({
                where: {
                    rentalRequestId 
                },
                create: {
                    rentalRequestId,
                    stripePaymentIntentId,
                    stripeCustomerId,
                    amount,
                    currency,
                    paymentMethod,
                    status: PaymentStatus.SUCCEEDED,
                    paidAt,
                },
                update: {
                    rentalRequestId,
                    stripePaymentIntentId,
                    stripeCustomerId,
                    amount,
                    currency,
                    paymentMethod,
                    status: PaymentStatus.SUCCEEDED,
                    paidAt,
                }
            }) 
            break;

        case "checkout.session.expired":
            // User abandoned checkout
             

            break;

        case "payment_intent.payment_failed":
            // Payment failed

            break; 

        default:
            console.log(`No events matched! Unhandled event type ${event.type}`);
            break
    } 
}

export const paymentService = {
    createPaymentSession,
    handleWebhook
}