import { Router } from 'express';
import stripe from './stripe';
import { authenticateJWT as authenticateToken } from './middleware';
import { query, execute } from './db';

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Price IDs - placeholders, should ideally be in env
const PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || 'price_monthly_placeholder',
  annual: process.env.STRIPE_PRICE_ANNUAL || 'price_annual_placeholder',
};

router.post('/create-checkout', authenticateToken, async (req: any, res) => {
  const { priceId } = req.body;
  const user = req.user;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId === 'annual' ? PRICES.annual : PRICES.monthly,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/premium`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/portal', authenticateToken, async (req: any, res) => {
  const user = req.user;

  try {
    const [dbUser]: any = query(`SELECT stripe_customer_id FROM users WHERE id = '${user.id}'`);
    
    if (!dbUser?.stripe_customer_id) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripe_customer_id,
      return_url: `${CLIENT_URL}/dashboard`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status', authenticateToken, async (req: any, res) => {
  const user = req.user;
  try {
    const [dbUser]: any = query(`SELECT subscription_tier FROM users WHERE id = '${user.id}'`);
    res.json({
      tier: dbUser?.subscription_tier || 'free',
      limits: {
        habits: dbUser?.subscription_tier === 'premium' ? -1 : 3
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      (req as any).rawBody || JSON.stringify(req.body),
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session: any = event.data.object;
      const userId = session.metadata.userId;
      const customerId = session.customer;

      execute(`UPDATE users SET subscription_tier = 'premium', stripe_customer_id = '${customerId}' WHERE id = '${userId}'`);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription: any = event.data.object;
      const customerId = subscription.customer;

      execute(`UPDATE users SET subscription_tier = 'free' WHERE stripe_customer_id = '${customerId}'`);
      break;
    }
    // Add other cases as needed
  }

  res.json({ received: true });
});

export default router;
