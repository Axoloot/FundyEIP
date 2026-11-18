/** Express router providing user related routes
 * @module tags
 * @requires express
 */

import express from 'express';
import asyncHandler from 'express-async-handler';

import database from '../../database';
import { ErrorRo } from '../../error';
import stripe from '../../services/stripe';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

/**
 * List available tags for projects and associations
 * @name post /
 * @function
 * @memberof module:tags
 * @inner
 */
router.post('/stripe-checkout', express.raw({ type: 'application/json' }), asyncHandler(async (req: any, res: any) => {
  let stripeEvent;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: process.env.STRIPE_WEBHOOK_SECRET as string,
    });

    stripeEvent = stripe.webhooks.constructEvent(
      payloadString,
      header,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
  const data = stripeEvent.data.object;
  if (stripeEvent.type === 'charge.succeeded') {
    const user = await database.user.findUnique({ where: { id: data.metadata.userId }});
    if (!user) {
      throw ErrorRo(StatusCodes.NOT_FOUND, 'user not found', 'user-not-found');
    }
    console.log('USER FOUND');
    let product;
    let connect;
    if (data.metadata.type === 'project') {
      product = await database.project.findUnique({ where: { id: data.metadata.productId }});
      connect = { Project: { connect: { id: data.metadata.productId } }};
    }
    if (data.metadata.type === 'association') {
      product = await database.association.findUnique({ where: { id: data.metadata.productId }});
      connect = { Association: { connect: { id: data.metadata.productId } }};
    }
    if (!product) {
      throw ErrorRo(StatusCodes.NOT_FOUND, 'product not found', 'product-not-found');
    }
    console.log('PRODUCT FOUND');
    await database.donation.create({
      data: {
        amount: data.metadata.amount * 100,
        type: 'card',
        User: {
          connect: { id: data.metadata.userId },
        },
        ...connect,
      }
    });
    console.log('DONATION CREATED');
    if (data.metadata.type === 'project') {
      await database.project.update({
        where: { id: data.metadata.productId },
        data: {
          raisedCurrently: {
            increment: parseInt(data.metadata.amount) * 100,
          },
        },
      });
      console.log('PROJECT UPDATED');
    }

    if (data.metadata.type === 'association') {
      await database.association.update({
        where: { id: data.metadata.productId },
        data: {
          raisedCurrently: {
            increment: parseInt(data.metadata.amount) * 100,
          },
        },
      });
      console.log('ASSOCIATION UPDATED');
    }
  }
  return res.sendStatus(200);
}));

export default router;
