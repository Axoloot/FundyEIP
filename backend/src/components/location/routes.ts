/** Express router providing user related routes
 * @module location
 * @requires express
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
// @ts-ignore
import isValidCoordinates from 'is-valid-coordinates';
import { VerifyCoordinates } from './entities';
import { queryMiddleware } from '../../middlewares/validator';

const router = express.Router();

/**
 * Verify given coordinates.
 * @name GET /
 * @function
 * @memberof module:location
 * @inner
 * @param {number} longitude - longitude
 * @param {number} latitude - latitude
 */
router.get('/', queryMiddleware(VerifyCoordinates), asyncHandler(async (req: any, res: any) => {
  /* Valid Latitude Format? */
  console.log(req.query);
  // @ts-ignore
  if (!isValidCoordinates.latitude(parseFloat(req.query.latitude))) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'invalid latitude', translationKey: 'invalid-latitude' });
  }
  /* Valid Longitude Format? */
  // @ts-ignore
  if (!isValidCoordinates.longitude(parseFloat(req.query.longitude))) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'invalid longitude', translationKey: 'invalid-longitude' });
  }
  return res.status(StatusCodes.OK).send({ message: 'valid coordinates' });
}));

export default router;
