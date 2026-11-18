import stripe from 'stripe';

// @ts-ignore
export default stripe.Stripe(process.env.STRIPE_SECRET_KEY as string);
