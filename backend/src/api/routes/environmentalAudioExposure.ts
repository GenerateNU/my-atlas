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
  Returns a mindfulSession model by providing the userID
   */
//   route.get('/getMindfulSession/:id', async (req: Request, res: Response, next: NextFunction) => {
//     const logger: Logger = Container.get('logger');
//     logger.debug('Calling getMindfulSession endpoint');
//     try {
//       const { id } = req.params;
//       const MindfulSessionServiceInstance = Container.get(MindfulSessionService);
//       const { mindfulSession } = await MindfulSessionServiceInstance.getMindfulSession(id);
//       return res.json({ mindfulSession }).status(200);
//     } catch (e) {
//       logger.error('🔥 error: %o', e);
//       return next(e);
//     }
//   });

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
