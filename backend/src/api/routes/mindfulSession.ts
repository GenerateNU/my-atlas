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
  Returns an array of mindfulSession by providing the userID, a startDate and an endDate.
   */
  route.get('/getMindfulSessionByDateRange/:id/', celebrate({
    body: Joi.object({
      userID: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    })
  }), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getMindfulSessionByDateRange endpoint');
    try {
      const MindfulSessionServiceInstance : MindfulSessionService = Container.get(MindfulSessionService);
      const mindfulSessionRecords = await MindfulSessionServiceInstance.getMindfulSessionByDateRange(req.body.userID, req.body.startDate, req.body.endDate);
      return res.json({ mindfulSessionRecords } ).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

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
