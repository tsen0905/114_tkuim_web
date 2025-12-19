import express from 'express';
import authRoutes from './routes/auth.js';
import signupRoutes from './routes/signup.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/signup', signupRoutes);

export default app;
