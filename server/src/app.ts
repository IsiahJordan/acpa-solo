import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/router.ts';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

app.use("/api", router);

export default app;
