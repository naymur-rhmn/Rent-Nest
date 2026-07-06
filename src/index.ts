import app from "./app";
import config from "./config"; 
import { prisma } from "./lib/prisma";


const main = async () => {
    try {
        await prisma.$connect(); 

        const server = app.listen(config.port, () => {
            console.log(`Server is Running on port: ${config.port}`)
        })

        server.on("error", (error) => {
            console.log(error)
            process.exit(1)
        })
    } catch (error) {
        console.error("Startup failed:", error);
        await prisma.$disconnect()
        process.exit(1);
    }
}

main();