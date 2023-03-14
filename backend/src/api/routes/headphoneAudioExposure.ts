import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import HeadphoneAudioExposureService from '@/services/headphoneExposure';
import { IHeadphoneAudioExposureDTO } from '@/interfaces/IHeadphoneAudioExposure';
//wtf

const route = Router();

export default (app: Router) => {
  app.use('/headphoneAudioExposure', route);

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
        const { headphoneAudioExposure } = await HeadphoneAudioExposureInstance.addHeadphoneAudioExposure(
          req.body as IHeadphoneAudioExposureDTO,
        );

        return res.status(201).json({ headphoneAudioExposure });
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
        const { headphoneAudioExposure } = await HeadphoneAudioExposureInstance.deleteHeadphoneAudioExposure(
          userID,
          startDate,
        );
        return res.json({ headphoneAudioExposure }).status(200);
      } catch (e) {
        logger.error(':fire: error: %o', e);
        return next(e);
      }
    },
  );
};
