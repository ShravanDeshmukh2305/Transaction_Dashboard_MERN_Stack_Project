import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', productRoutes);

export default app;