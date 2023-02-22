import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IGPSInputDTO } from '@/interfaces/IGPS';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import GPSService from '@/services/gps';

const route = Router();
export default (app: Router) => {
  app.use('/gps', route);

  // Route to post GPS data
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
      logger.debug('Calling addGPS endpoint with body: %o', req.body);
      try {
        const GPSServiceInstance = Container.get(GPSService);
        const { gps } = await GPSServiceInstance.addGPS(req.body as IGPSInputDTO);
        return res.status(201).json({ gps });
        return;
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // Route to get GPS information with parameter userID
  route.get('/getGPS/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getGPS endpoint');
    try {
      const { id } = req.params;
      const GPSServiceInstance = Container.get(GPSService);
      const { gps } = await GPSServiceInstance.getGPS(id);
      return res.json({ gps }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  // Route to delete GPS information with parameter userID
  route.delete('/deleteGPS/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling delete GPS endpoint');
    try {
      const { id } = req.params;
      const GPSServiceInstance = Container.get(GPSService);
      const { gps } = await GPSServiceInstance.deleteGPSByUserID(id);
      return res.json({ gps }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
