import express from "express";
import cors from "cors"
import config from "./config";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.route";
import { landloardRouter } from "./modules/landlord/landlord.route";
import { categoriesRouter } from "./modules/categories/categories.route";
import { propertiesRouter } from "./modules/properties/properties.route";
import { rentalRouter } from "./modules/rental-requests/rental.route";
import { adminRouter } from "./modules/admin/admin.router";
import { paymentRouter } from "./modules/rental-payment/payment.route";        
import { reviewRouter } from "./modules/review/review.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app = express();

// middlewares
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));

app.post('/api/payments/confirm', express.raw({type: 'application/json'}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "RentNest API",
    })
})

app.use("/api/auth", authRouter) 
app.use("/api/categories", categoriesRouter)
app.use("/api/landlord", landloardRouter)
app.use("/api/properties", propertiesRouter)
app.use("/api/rentals", rentalRouter)
app.use("/api/payments", paymentRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/admin", adminRouter)


app.use(notFound)
app.use(globalErrorHandler)

export default app;