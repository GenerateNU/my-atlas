import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import HeadphoneAudioExposureService from '@/services/headphoneAudioExposure';
import { IHeadphoneAudioExposureDTO } from '@/interfaces/IHeadphoneAudioExposure';
import { start } from 'repl';

const route = Router();

export default (app: Router) => {
  app.use('/headphoneAudioExposure', route);

  //make get request to get and aggregate headphoneAudioExposure

  // make post request to add headphoneAudioExposure
  route.post(
    '/addHeadphoneAudioExposure',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number(),
        value: Joi.string(),
        hkID: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      try {
        const HeadphoneAudioExposureInstance = Container.get(HeadphoneAudioExposureService);
        const { headphoneExposure } = await HeadphoneAudioExposureInstance.addHeadphoneAudioExposure(
          req.body as IHeadphoneAudioExposureDTO,
        );

        return res.status(201).json({ headphoneExposure });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // deletes headphoneAudioExposure given a userID and startDdate
  route.delete(
    '/deleteHeadphoneAudioExposure/userID/:userID/startDdate/:date',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling deleteActivity endpoint');
      try {
        const userID = req.params.userID;
        const startDate = new Date(req.params.date);

        const HeadphoneAudioExposureInstance = Container.get(HeadphoneAudioExposureService);
        const { headphoneExposure } = await HeadphoneAudioExposureInstance.deleteHeadphoneExposureSampleByIDAndDate(
          userID,
          startDate,
        );
        return res.json({ headphoneExposure }).status(200);
      } catch (e) {
        logger.error(':fire: error: %o', e);
        return next(e);
      }
    },
  );
};

// make get request to add headphoneAudioExposure
route.get(
  '/readHeadphoneAudioExposure',
  celebrate({
    body: Joi.object({
      userID: Joi.string().required(),
      startDate: Joi.date().required(),
      duration: Joi.number(),
      value: Joi.string(),
      hkID: Joi.string(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const HeadphoneAudioExposureInstance = Container.get(HeadphoneAudioExposureService);
      const { headphoneExposure } = await HeadphoneAudioExposureInstance.addHeadphoneAudioExposure(
        req.body as IHeadphoneAudioExposureDTO,
      );

      return res.status(201).json({ headphoneExposure });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);

// make get request to retrieve headphoneAudioExposure
route.get(
  '/readHeadphoneAudioExposure/userID/:userID/startDate/:startDate/endDate/:endDate/',
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.info('Calling readHeadphoneAudioExposure endpoint');
    try {
      const id = req.params.userID;
      const startDate = new Date(req.params.startDate);
      const endDate = new Date(req.params.startDate + req.params.duration);
      const ServiceInstance = Container.get(HeadphoneAudioExposureService);
      const headphoneAudioExposure = await ServiceInstance.readHeadphoneAudioExposure(id, startDate, endDate);
      return res.json(headphoneAudioExposure).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
