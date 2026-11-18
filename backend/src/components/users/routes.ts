/** Express router providing user related routes
 * @module users
 * @requires express
 */

import express from 'express';
import asyncHandler from 'express-async-handler';

import stripe from '../../services/stripe';
import authMiddleware from '../../middlewares/auth';
import {
  deleteUser,
  followProject,
  getUser,
  modifyUser,
  unfollowProject,
  getTransactions,
  followAssociation,
  unfollowAssociation,
  modifyProfilePicture,
  verifyEmail,
  getDonations,
} from './controllers';
import { bodyMiddleware } from '../../middlewares/validator';
import { projectDonation, projectCardPaymentLink, associationDonation, associationCardPaymentLink, projectCardPaymentSheet, associationCardPaymentSheet } from '../projects/controllers';
import { DonateToProjectBody, DonateToProjectByCardBody } from '../projects/entities';
import { ModifyProfilePictureBody, ModifyUser } from './entities';
import { disableAccount, activeAccount, deleteAccount } from '../../services/nordigen/controller';
import { ResetPasswordBody, VerifyEmail } from "../auth/entities";

const router = express.Router();

router.post('/pay', asyncHandler(async (req: any, res: any) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    setup_future_usage: 'off_session',
    customer: req.body.customerId,
    payment_method_types: ['sepa_debit'],
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'sepa_debit_accept_a_payment'},
  });
  return res.send(intent);
}))

router.use(authMiddleware);

/**
 * Retrieve logged user data
 * @name GET /me
 * @function
 * @memberof module:users
 * @inner
 */
router.get('/me', asyncHandler(async (_req: any, res: any) => {
  const user = await getUser({ id: res.locals.user.id });
  return res.send(user);
}));

/**
 * Update logged user data
 * @name PATCH /me
 * @function
 * @memberof module:users
 * @inner
 * @param {string} email - email
 * @param {string} firstname - firstname
 * @param {string} lastname - lastname
 * @param {string} lang - lang (en | fr | es)
 * @param {string} roundedTo - roundedTo
 */
router.patch('/me', bodyMiddleware(ModifyUser), asyncHandler(async (req: any, res: any) => {
  const user = await modifyUser(res.locals.user.id, req.body);
  return res.send(user);
}));

router.delete('/me', asyncHandler(async (req: any, res: any) => {
  const user = await deleteUser(res.locals.user.id);
  return res.send(user);
}));

/**
 * Logged user follow a project
 * @name POST /me/follow-project/:id
 * @function
 * @memberof module:users
 * @inner
 * @param {string} id - Project id
 */
router.post('/me/follow-project/:id', asyncHandler(async (req: any, res: any) => {
  const followedProjects = await followProject(res.locals.user.id, req.params.id);
  return res.send(followedProjects);
}));

/**
 * Logged user unfollow a project
 * @name DELETE /me/follow-project/:id
 * @function
 * @memberof module:users
 * @inner
 * @param {string} id - Project id
 */
router.delete('/me/unfollow-project/:id', asyncHandler(async (req: any, res: any) => {
  const followedProjects = await unfollowProject(res.locals.user.id, req.params.id);
  return res.send(followedProjects);
}));

/**
 * Logged user follow an association
 * @name POST /me/follow-association/:id
 * @function
 * @memberof module:users
 * @inner
 * @param {string} id - Association id
 */
router.post('/me/follow-association/:id', asyncHandler(async (req: any, res: any) => {
  const followedAssociation = await followAssociation(res.locals.user.id, req.params.id);
  return res.send(followedAssociation);
}));

/**
 * Logged user unfollow an association
 * @name DELETE /me/follow-association/:id
 * @function
 * @memberof module:users
 * @inner
 * @param {string} id - Associatio id
 */
router.delete('/me/unfollow-association/:id', asyncHandler(async (req: any, res: any) => {
  const followedAssociation = await unfollowAssociation(res.locals.user.id, req.params.id);
  return res.send(followedAssociation);
}));

/**
 * List logged user transaction
 * @name GET /me/transactions
 * @function
 * @memberof module:users
 * @inner
 */
router.get('/me/transactions', asyncHandler(async (_req: any, res: any) => {
  const data = await getTransactions(res.locals.user);
  return res.send(data);
}));

/**
 * List logged user donations
 * @name GET /me/transactions
 * @function
 * @memberof module:users
 * @inner
 */
router.get('/me/donations', asyncHandler(async (_req: any, res: any) => {
  const data = await getDonations(res.locals.user);
  return res.send(data);
}));

/**
 * Get logged user piggy bank data
 * @name GET /me/piggybank
 * @function
 * @memberof module:users
 * @inner
 */
router.get('/me/piggybank', asyncHandler(async (_req: any, res: any) => {
  return res.send({amount: res.locals.user.piggyBank });
}));

/**
 * Logged user donate to a project
 * @name POST /me/donate/projects/:projectId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} projectId - Project id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/projects/:projectId', bodyMiddleware(DonateToProjectBody), asyncHandler(async (req: any, res: any) => {
  const project = await projectDonation(res.locals.user.id, req.params.projectId, req.body.amount);
  return res.send(project);
}));

/**
 * Logged user donate to a project
 * @name POST /me/donate/payment-link/projects/:projectId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} projectId - Project id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/payment-link/projects/:projectId', bodyMiddleware(DonateToProjectByCardBody), asyncHandler(async (req: any, res: any) => {
  const project = await projectCardPaymentLink(res.locals.user.id, req.params.projectId, req.body);
  return res.send(project);
}));

/**
 * Logged user donate to a project
 * @name POST /me/donate/payment-sheet/projects/:projectId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} projectId - Project id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/payment-sheet/projects/:projectId', bodyMiddleware(DonateToProjectBody), asyncHandler(async (req: any, res: any) => {
  const project = await projectCardPaymentSheet(res.locals.user.id, req.params.projectId, req.body.amount);
  return res.send(project);
}));


/**
 * Logged user donate to an association
 * @name POST /me/donate/associations/:associationId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} associationId - Association id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/associations/:associationId', bodyMiddleware(DonateToProjectBody), asyncHandler(async (req: any, res: any) => {
  const association = await associationDonation(res.locals.user.id, req.params.associationId, req.body.amount);
  return res.send(association);
}));

/**
 * Logged user donate to an association
 * @name POST /me/donate/payment-link/associations/:associationId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} associationId - Association id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/payment-link/associations/:associationId', bodyMiddleware(DonateToProjectByCardBody), asyncHandler(async (req: any, res: any) => {
  const association = await associationCardPaymentLink(res.locals.user.id, req.params.associationId, req.body);
  return res.send(association);
}));


/**
 * Logged user donate to an association
 * @name POST /me/donate/payment-sheet/associations/:associationId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} associationId - Association id
 * @param {number} amount - Donation amount
 */
router.post('/me/donate/payment-sheet/associations/:associationId', bodyMiddleware(DonateToProjectBody), asyncHandler(async (req: any, res: any) => {
  const association = await associationCardPaymentSheet(res.locals.user.id, req.params.associationId, req.body.amount);
  return res.send(association);
}));


/**
 * Update logged user profile pic
 * @name PATCH /me/profile-picture
 * @function
 * @memberof module:users
 * @inner
 * @param {string} picture - Picture
 */
router.patch('/me/profile-picture', bodyMiddleware(ModifyProfilePictureBody), asyncHandler(async (req: any, res: any) => {
  const user = await modifyProfilePicture(res.locals.user.id, Buffer.from(req.body.picture, 'base64'));
  return res.send(user);
}));

/**
 * Disable linked bank account transactions rounding
 * @name PUT /me/linked-accounts/:accountId/disable
 * @function
 * @memberof module:users
 * @inner
 * @param {string} accountId - Account Id
 */
router.put('/me/linked-accounts/:accountId/disable', asyncHandler(async (req: any, res: any) => {
  return res.send(await disableAccount(req.params.accountId));
}));

/**
 * Activate linked bank account transactions rounding
 * @name PUT /me/linked-accounts/:accountId/active
 * @function
 * @memberof module:users
 * @inner
 * @param {string} accountId - Account Id
 */
router.put('/me/linked-accounts/:accountId/active', asyncHandler(async (req: any, res: any) => {
  return res.send(await activeAccount(req.params.accountId));
}));

/**
 * Delete a linked bank account
 * @name DELETE /me/linked-accounts/:accountId
 * @function
 * @memberof module:users
 * @inner
 * @param {string} accountId - Account Id
 */
router.delete('/me/linked-accounts/:accountId', asyncHandler(async (req: any, res: any) => {
  return res.send(await deleteAccount(req.params.accountId));
}));

/**
 * Route  form.
 * @name POST /me/verify-email
 * @function
 * @memberof module:auth
 * @inner
 * @param {string} token - User Token from signup email
 */
router.post('/me/verify-email', bodyMiddleware(VerifyEmail), asyncHandler(async (req: any, res: any) => {
  const result = await verifyEmail(res.locals.user.id, req.body.token);
  return res.send(result);
}));

export default router;
