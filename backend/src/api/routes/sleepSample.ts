import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { ISleepSampleDTO } from '../../interfaces/ISleepSample';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import SleepSampleService from '../../services/sleepSample';

const route = Router();

export default (app: Router) => {
  app.use('/sleepSample', route);

  // make post request to add sleepSample
  route.post(
    '/addSleepSample',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        date: Joi.date().required(),
        duration: Joi.number(),
        sleepState: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const SleepSampleInstance = Container.get(SleepSampleService);
        const { sleepSample } = await SleepSampleInstance.addSleepSample(req.body as ISleepSampleDTO);
        return res.status(201).json({ sleepSample });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // deletes sleepSample given a userID and startDdate
  route.delete(
    '/deleteSleepSample/userID/:userID/startDdate/:date',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling deleteActivity endpoint');
      try {
        const userID = req.params.userID;
        const startDate = new Date(req.params.date);

        const SleepSampleInstance = Container.get(SleepSampleService);
        const { sleepSample } = await SleepSampleInstance.deleteSleepSample(userID, startDate);
        return res.json({ sleepSample }).status(200);
      } catch (e) {
        logger.error(':fire: error: %o', e);
        return next(e);
      }
    },
  );
};
