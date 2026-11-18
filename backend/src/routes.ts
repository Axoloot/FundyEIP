import express from 'express';

import nordigenRoutes from './services/nordigen/routes';
import notificationsRoutes from './services/notifications/routes';

import authRoutes from './components/auth/routes';
import usersRoutes from './components/users/routes';
import potsRoutes from './components/pots/routes';
import tagsRoutes from './components/tags/routes';
import partnerRoutes from './components/partner/routes';
import locationRoutes from './components/location/routes';
import projectsRoutes from './components/projects/routes';
import associationsRoutes from './components/associations/routes';
import paymentWebhooksRoutes from './components/payment-webhooks/routes';

const router = express.Router();

// SERVICES
router.use('/nordigen', nordigenRoutes);
router.use('/notifications', notificationsRoutes);

// COMPONENTS
router.use('/auth', authRoutes);
router.use('/pots', potsRoutes);
router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);
router.use('/partner', partnerRoutes);
router.use('/projects', projectsRoutes);
router.use('/location', locationRoutes);
router.use('/associations', associationsRoutes);
router.use('/payment-webhooks', paymentWebhooksRoutes);

export default router;
