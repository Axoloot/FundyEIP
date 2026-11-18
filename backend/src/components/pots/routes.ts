import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { CreatePotBody } from './entities';
import { bodyMiddleware } from '../../middlewares/validator';
import {
  getPots,
  getProjectPot,
  createProjectPot,
  getAssociationPots,
  createAssociationPot
} from './controllers';

const router = express.Router();

router.get('/', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getPots());
}));

router.get('/projects/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getProjectPot(req.params.id));
}));

router.post('/projects/:id', bodyMiddleware(CreatePotBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createProjectPot(req.body, req.params.id));
}));

router.get('/associations/:id', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await getAssociationPots(req.params.id));
}));

router.post('/associations/:id', bodyMiddleware(CreatePotBody), asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send(await createAssociationPot(req.body, req.params.id));
}));

export default router;
