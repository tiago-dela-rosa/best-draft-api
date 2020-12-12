import logger from "./logger";
import { Request as req, Response as res, NextFunction as next } from 'express';
import dayjs from 'dayjs';

export default function smiteAuth(req, res, next) {
  logger.debug('smiteAuth')
  const session = req.headers['smite-api-session'];
  const sessionTime = req.headers['smite-api-session-createdtime']
  const currentTime = dayjs()
  const diffTimeInMinutes = currentTime.diff(sessionTime, 'm')
  logger.info(`Session time remaining: ${15 - diffTimeInMinutes} minutes`)

  if (!session || !sessionTime) 
    return res.status(401).send({ auth: false, message: 'Session invalid or not provided' });

  else if (diffTimeInMinutes > 15)
    return res.status(401).send({ auth: false, message: 'Session expired' });
      
  else
    next();
}
