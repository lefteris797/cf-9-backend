import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import {setupSwagger} from './swagger';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
   origin:['http://localhost:4200', 'http://render.ccccccc.com']
}))

setupSwagger(app);
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;