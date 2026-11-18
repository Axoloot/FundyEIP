/** Express router providing user related routes
 * @module tags
 * @requires express
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';


const router = express.Router();

/**
 * List available tags for projects and associations
 * @name GET /
 * @function
 * @memberof module:tags
 * @inner
 */
router.get('/', asyncHandler(async (req: any, res: any) => {
  return res.status(StatusCodes.OK).send([
    'FOOD',
    'SPORT',
    'HEALTH',
    'FOOTBALL',
    'ANIMAL',
    'ENVIRONMENT',
    'TOY',
    'CHILD',
    'CHILDREN',
    'FRANCE',
    'USA',
    'COUNTRY',
    'ITALY',
    'CANADA',
    'TREE',
    'LEAF',
    'COMPUTER',
    'SCIENCE',
    'DISCOVERY',
    'NATURE',
    'TENNIS',
    'BASKETBALL',
    'BASEBALL',
    'COLOR',
    'TASK',
    'YOUNG',
    'OLD',
    'SCHOOL',
    'TECHNOLOGY',
    'TECH',
    'FINTECH',
    'FINANCE',
    'ECONOMY',
    'FUTURE',
    'PAST',
    'DEATH',
    'LIVE',
    'GAME',
    'SOCIETY',
    'LIFE',
    'LIFESTYLE',
    'BACON',
    'ROBOT',
    'DEVELOPER',
    'APPLICATION',
    'MOOD',
    'HEALTHCARE',
    'PORTUGAL',
    'DOCTOR',
    'DOG',
    'CAR',
    'CAT',
    'PARROT',
    'MEDICINE',
    'HISTORY',
    'GEOGRAPHY',
    'LOCAL',
    'PLANET',
    'STREETFOOD',
    'RUGBY',
    'ALCOOL'
  ]);
}));

export default router;
