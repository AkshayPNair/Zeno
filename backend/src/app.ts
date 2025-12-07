import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./interfaces/middleware/errorHandler";
import authRoutes from './interfaces/routes/auth.routes'
import documentRoutes from './interfaces/routes/document.routes'

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));

app.use('/api/auth', authRoutes)
app.use('/api/documents',documentRoutes)

app.use(errorHandler)

app.get("/", (_req, res) => {
  res.send('Zeno API is Running')
});

export { app };
