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

const app = express();

// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/api/auth", authRouter) 

app.use("/api/categories", categoriesRouter)

app.use("/api/landlord", landloardRouter)

app.use("/api/properties", propertiesRouter)

app.use("/api/rentals", rentalRouter)



app.use("/api/admin", adminRouter)



app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "RentNest API",
    })
})

export default app;