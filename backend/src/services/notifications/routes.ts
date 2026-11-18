/** Express router providing user related routes
 * @module notifications
 * @requires express
 */

import express from 'express';
import asyncHandler from 'express-async-handler';

import { registerToken } from './controllers';
import { StatusCodes } from 'http-status-codes';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

/**
 * Register user notifications token
 * @name POST /token/:token
 * @function
 * @memberof module:notifications
 * @inner
 */
router.post('/token/:token', authMiddleware, asyncHandler(async (req: any, res: any) => {
  await registerToken(res.locals.user.id, req.params.token);
  return res.status(StatusCodes.OK).send({ message: 'token successfully registered'})
}))

export default router;
