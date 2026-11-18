/** Express router providing user related routes
 * @module nordigen
 * @requires express
 */

import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IsString } from 'class-validator';

import authMiddleware from '../../middlewares/auth';
import { getUser } from '../../components/users/controllers';
import { queryMiddleware } from '../../middlewares/validator';
import { GetInstitutionLink, ValidateInstitution } from './entities';
import { listAvailableBanks, getInstitutionAuthLink, institutionValidation } from './controller';

const router = express.Router();

/**
 * List available banks
 * @name GET /banks
 * @function
 * @memberof module:nordigen
 * @inner
 */
router.get('/banks', authMiddleware, asyncHandler(async (req: any, res: any) => {
  return res.send(await listAvailableBanks())
}));

/**
 * Get authentication link from institution id listed before with GET /banks
 * @name GET /institution-link
 * @function
 * @memberof module:nordigen
 * @inner
 * @param {string} institutionId - Bank id
 * @param {string} redirectUrl - Redirect url
 */
router.get('/institution-link', authMiddleware, queryMiddleware(GetInstitutionLink), asyncHandler(async (req: any, res: any) => {
  const { institutionId, redirectUrl } = req.query;
  const user = await getUser({ id: res.locals.user.id });

  // @ts-ignore
  return res.send(await getInstitutionAuthLink(institutionId, redirectUrl, user.id))
}));

/**
 * Validate the token provided from the authentication link
 * @name POST /institution-validation
 * @function
 * @memberof module:nordigen
 * @inner
 * @param {string} ref - Token
 */
router.post('/institution-validation', authMiddleware, queryMiddleware(ValidateInstitution), asyncHandler(async (req: any, res: any) => {
  const { ref } = req.query;
  const user = await getUser({ id: res.locals.user.id });

  // @ts-ignore
  return res.send(await institutionValidation(ref, user.id))
}));

export default router;
