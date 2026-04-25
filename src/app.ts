import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import {setupSwagger} from './swagger';

dotenv.config();

const app = express();

setupSwagger(app);
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;