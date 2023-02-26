import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IMindfulSessionDTO } from '@/interfaces/IMindfulSession';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import MindfulSessionService from '@/services/mindfulSession';

const route = Router();
export default (app: Router) => {
  app.use('/mindfulSession', route);

  /*
  Adds a mindfulSession model to the database and returns the entry added
  */
  route.post(
    '/addMindfulSession',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling mindfulSession endpoint with body: %o', req.body);
      try {
        const MindfulSessionServiceInstance = Container.get(MindfulSessionService);
        const { mindfulSession } = await MindfulSessionServiceInstance.addMindfulSession(req.body as IMindfulSessionDTO);
        return res.status(201).json({ mindfulSession });
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
  Deletes a MindfulSession model by providing the userID
   */
  route.delete('/deleteMindfulSession/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteMindfulSession endpoint');
    try {
      const MindfulSessionServiceInstance = Container.get(MindfulSessionService);
      const { mindfulSession } = await MindfulSessionServiceInstance.deleteMindfulSessionByUserID(req.params.id);
      return res.json({ mindfulSession }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
