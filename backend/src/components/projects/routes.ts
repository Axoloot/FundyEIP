/** Express router providing user related routes
 * @module projects
 * @requires express
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { GetProjects } from './entities';
import { queryMiddleware } from '../../middlewares/validator';
import { getProjects, getProject, getTrendingProjects } from './controllers';

const router = express.Router();

/**
 * List projects
 * @name GET /
 * @function
 * @memberof module:projects
 * @inner
 * @param {string} tag - Projects tag search
 * @param {string} q - Query search
 */
router.get('/', queryMiddleware(GetProjects), asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  return res.status(StatusCodes.OK).send(await getProjects(req.query));
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
  return res.status(StatusCodes.OK).send(await getTrendingProjects());
}));

/**
 * Retrieve project from id
 * @name GET /:id
 * @function
 * @memberof module:projects
 * @inner
 * @param {string} id - Project id
 */
router.get('/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getProject(req.params.id));
}));

export default router;
