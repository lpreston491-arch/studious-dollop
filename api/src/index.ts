import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth';
import habitRoutes from './habits';
import dashboardRoutes from './dashboard';
import subscriptionRoutes from './subscriptions';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Custom middleware to capture raw body for Stripe webhooks
app.use(
  express.json({
    verify: (req: any, res, buf) => {
      if (req.originalUrl.startsWith('/api/subscriptions/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
