import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import { authRouter } from "./modules/auth/auth.route";

const app = express();

// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/api/auth", authRouter);



app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "Hello world"
    })
})

export default app;