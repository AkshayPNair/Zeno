import http from "http";
import { app } from "./app";
import { connectDB } from "./infrastructure/database/connection";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/.env" });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
    await connectDB();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
