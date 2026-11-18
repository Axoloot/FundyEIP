import React from 'react';
import config from '../config';
import { StripeProvider as Provider } from '@stripe/stripe-react-native';

const StripeProvider = ({ children }) => (
  <Provider publishableKey={config.STRIPE_CLIENT_SECRET}>
    {children}
  </Provider>
);

export default StripeProvider;