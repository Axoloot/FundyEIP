/** Express router providing user related routes
 * @module associations
 * @requires express
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { GetAssociations } from './entities';
import { queryMiddleware } from '../../middlewares/validator';
import { getAssociations, getAssociation, getTrendingAssociations } from './controllers';

const router = express.Router();

/**
 * List associations
 * @name GET /
 * @function
 * @memberof module:associations
 * @inner
 * @param {string} tag - Associations tag search
 * @param {string} q - Query search
 */
router.get('/', queryMiddleware(GetAssociations), asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  return res.status(StatusCodes.OK).send(await getAssociations(req.query));
}));


/**
 * List trending projects
 * @name GET /trending
 * @function
 * @memberof module:projects
 * @inner
 */
router.get('/trending', asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  return res.status(StatusCodes.OK).send(await getTrendingAssociations());
}));

/**
 * Retrieve association from id
 * @name GET /:id
 * @function
 * @memberof module:associations
 * @inner
 * @param {string} id - Association id
 */
router.get('/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getAssociation(req.params.id));
}));

export default router;
