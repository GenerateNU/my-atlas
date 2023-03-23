import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import EnvironmentalAudioExposureService from '@/services/environmentalAudioExposure';

const route = Router();
export default (app: Router) => {
  app.use('/environmentalAudioExposure', route);

  /*
  Adds a EnvironmentalAudioExposure model to the database and returns the entry added
  */
  route.post(
    '/addEnvironmentalAudioExposure',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        value: Joi.number().required(),
        hkID: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addEnvironmentalAudioExposure endpoint with body: %o', req.body);
      try {
        const EnvironmentalAudioExposureInstance = Container.get(EnvironmentalAudioExposureService);
        const { environmentalAudioExposure } = await EnvironmentalAudioExposureInstance.addEnvironmentalAudioExposure(req.body as IEnvironmentalAudioExposureDTO);
        return res.status(201).json({ environmentalAudioExposure });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Returns an array of environmentalAudioExposures by providing the userID, a startDate and an endDate.
   */
  route.get('/getEnvironmentalAudioExposureByDateRange/:id/', celebrate({
    body: Joi.object({
      userID: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    })
  }), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getEnvironmentalAudioExposureByDateRange endpoint');
    try {
      const EnvironmentalAudioExposureInstance : EnvironmentalAudioExposureService = Container.get(EnvironmentalAudioExposureService);
      const environmentalAudioExposureRecords = await EnvironmentalAudioExposureInstance.getEnvironmentalAudioExposureByDateRange(req.body.userID, req.body.startDate, req.body.endDate);
      return res.json({ environmentalAudioExposureRecords } ).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  /*
  Deletes a EnvironmentalAudioExposure model by providing the userID
   */
  route.delete('/deleteEnvironmentalAudioExposure/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteEnvironmentalAudioExposure endpoint');
    try {
      const EnvironmentalAudioExposureInstance = Container.get(EnvironmentalAudioExposureService);
      const { environmentalAudioExposure } = await EnvironmentalAudioExposureInstance.deleteEnvironmentalAudioExposureByUserID(req.params.id);
      return res.json({ environmentalAudioExposure }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
