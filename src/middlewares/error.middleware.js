import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const errorHandle = (e, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(e);
  }
  if (e.uncaughtError instanceof Joi.ValidationError) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  return next(e);
};

export default errorHandle;
