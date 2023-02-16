import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IGPSInputDTO } from '@/interfaces/IGPS';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import GPSService from '@/services/gps';

const route = Router();
export default (app: Router) => {
  app.use('/gps', route);

  route.post(
    '/addGPS',
    celebrate({
      body: Joi.object({
        timestamp: Joi.number().required(),
        userID: Joi.string().required(),
        latitude: Joi.number(), // not sure if this should be a number or not, in expo it returns a number
        longitude: Joi.number(),
        altitude: Joi.number(),
        accuracy: Joi.number(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const GPSServiceInstance = Container.get(GPSService);
        const { gps } = await GPSServiceInstance.addGPS(req.body as IGPSInputDTO);
        return res.status(201).json({ gps });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
