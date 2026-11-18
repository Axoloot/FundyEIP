/** Express router providing user related routes
 * @module partner
 * @requires express
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../../middlewares/auth';
import { bodyMiddleware, queryMiddleware } from '../../middlewares/validator';
import {
  CreateAssociationBody,
  GetAssociations,
  CreateProjectBody,
  GetProjects,
  UpdateAssociationBody, UpdateProjectBody, CreateActionBody
} from './entities';
import {
  getAssociations,
  getAssociation,
  createAssociation,
  createProject,
  getProject,
  getProjects,
  getDonations,
  createAction,
  updateAssociation, updateProject, updateAction
} from './controllers';

const router = express.Router();

router.use(authMiddleware);

/**
 * List created associations
 * @name GET /associations
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} tag - Association tag
 * @param {string} q - Query search
 */
router.get('/associations', queryMiddleware(GetAssociations), asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  return res.status(StatusCodes.OK).send(await getAssociations(res.locals.user.id, req.query));
}));

/**
 * Retrieve details from association id
 * @name GET /associations/:id
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} id - Association id
 */
router.get('/associations/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getAssociation(req.params.id));
}));

/**
 * Create action
 * @name POST /associations/:id/actions
 * @function
 * @memberof module:partner
 * @inner
 */
router.post('/associations/:id/actions', bodyMiddleware(CreateActionBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createAction(req.params.id, 'ASSOCIATION', req.body));
}))

/**
 * Create action
 * @name PATCH /actions/:id
 * @function
 * @memberof module:partner
 * @inner
 */
router.patch('/actions/:id', bodyMiddleware(CreateActionBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await updateAction(req.params.id, req.body));
}))

/**
 * Create a new association.
 * @name POST /associations
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} email - Association email
 * @param {string} name - Association name
 * @param {string} description - Association description
 * @param {string} image - Association image url
 * @param {string} title - Association email
 * @param {number} longitude - Association location longitude
 * @param {number} latitude - Association location latitude
 */
router.post('/associations', bodyMiddleware(CreateAssociationBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createAssociation(res.locals.user.id, req.body));
}));

/**
 * Update an association.
 * @name PATCH /associations/:id
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} email - Association email
 * @param {string} name - Association name
 * @param {string} description - Association description
 * @param {string} image - Association image url
 * @param {string} title - Association email
 * @param {number} longitude - Association location longitude
 * @param {number} latitude - Association location latitude
 */
router.patch('/associations/:id', bodyMiddleware(UpdateAssociationBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await updateAssociation(req.params.id, req.body));
}));


/**
 * List created projects
 * @name GET /projects
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} tag - Projects tag
 * @param {string} q - Query search
 */
router.get('/projects', queryMiddleware(GetProjects), asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  return res.status(StatusCodes.OK).send(await getProjects(res.locals.user.id, req.query));
}));

/**
 * Retrieve details from project id
 * @name GET /projects/:id
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} id - Project id
 */
router.get('/projects/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getProject(req.params.id));
}));

/**
 * Create action
 * @name POST /projects/:id/actions
 * @function
 * @memberof module:partner
 * @inner
 */
router.post('/projects/:id/actions', bodyMiddleware(CreateActionBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createAction(req.params.id, 'PROJECT', req.body));
}))

/**
 * Create a new project.
 * @name POST /projects
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} email - Project email
 * @param {string} name - Project name
 * @param {string} description - Project description
 * @param {string} image - Project image url
 * @param {string} title - Project email
 * @param {number} goal - Project donation goal
 * @param {string[]} goal - Project tags list (Sport, Health ...)
 * @param {number} longitude - Project location longitude
 * @param {number} latitude - Project location latitude
 */
router.post('/projects', bodyMiddleware(CreateProjectBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createProject(res.locals.user.id, req.body));
}));

/**
 * Update a project.
 * @name PATCH /projects/:id
 * @function
 * @memberof module:partner
 * @inner
 * @param {string} email - Project email
 * @param {string} name - Project name
 * @param {string} description - Project description
 * @param {string} image - Project image url
 * @param {string} title - Project email
 * @param {number} goal - Project donation goal
 * @param {string[]} goal - Project tags list (Sport, Health ...)
 * @param {number} longitude - Project location longitude
 * @param {number} latitude - Project location latitude
 */
router.patch('/projects/:id', bodyMiddleware(UpdateProjectBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await updateProject(req.params.id, req.body));
}));

/**
 * List donations
 * @name GET /donations
 * @function
 * @memberof module:partner
 * @inner
 */
router.get('/donations', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getDonations(res.locals.user.id));
}))

export default router;
