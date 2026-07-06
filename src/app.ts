import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";

const app = express();

// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())






app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "Hello world"
    })
})

export default app;