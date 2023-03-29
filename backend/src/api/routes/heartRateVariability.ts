import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IHeartRateVariabilityDTO } from '../../interfaces/IHeartRateVariability';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import HeartRateVariabilityService from '@/services/heartRateVariability';
import middlewares from '../middlewares';
import HeartRateSampleService from '@/services/heartRateSample';

const route = Router();


export default (app: Router) => {
  app.use('/heartRateVariability', route);


// make post request to add heartRateVariability
route.post(
'/addHeartRateVariability',
middlewares.isAuth, middlewares.authorizeUser,
celebrate({
 body: Joi.object({
   userID: Joi.string().required(),
   startDate: Joi.date().required(),
   duration: Joi.number().required(),
   variability: Joi.number().required(),
   hkID: Joi.string().required(),
   hkWasUserEntered: Joi.boolean().required()
 }),
}),
async (req: Request, res: Response, next: NextFunction) => {
 const logger:Logger = Container.get('logger');
 logger.debug('Calling addHeartRateVariability endpoint with body: %o', req.body );
 try {
   const HeartRateVariabilityServiceInstance = Container.get(HeartRateVariabilityService);
   const heartRateVariability = await HeartRateVariabilityServiceInstance.addHeartRateVariability(req.body as IHeartRateVariabilityDTO);
   return res.status(201).json({ heartRateVariability });
 } catch (e) {
   logger.error('🔥 error: %o', e);
   return next(e);
 }
},
);


// make get request to retrieve heart rate variability, given id
route.get(
'/getHeartRateVariabilityByID/id/:id/',
middlewares.isAuth, middlewares.authorizeUser,
async (req: Request, res: Response, next: NextFunction) => {
 const logger:Logger = Container.get('logger');
 logger.debug('Calling getHeartRateVariabilityByID endpoint');
 try {
   const id = req.params.id;
   const HeartRateVariabilityServiceInstance = Container.get(HeartRateVariabilityService);
   const heartRateVariability = await HeartRateVariabilityServiceInstance.getHeartRateVariabilityByID(id);
   return res.json({ heartRateVariability }).status(200);
 } catch (e) {
   logger.error('🔥 error: %o',  e );
   return next(e);
 }
},
);


// deletes heart rate variability given an id
route.delete(
  '/deleteHeartRateVariabilityByID/id/:id',
  middlewares.isAuth, middlewares.authorizeUser,
  async (req: Request, res: Response, next: NextFunction) => {
  // make post request to add heartRateVariability
  route.post(
    '/addHeartRateVariability',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        variability: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addHeartRateVariability endpoint with body: %o', req.body);
      try {
        const HeartRateVariabilityServiceInstance = Container.get(HeartRateVariabilityService);
        const heartRateVariability = await HeartRateVariabilityServiceInstance.addHeartRateVariability(
          req.body as IHeartRateVariabilityDTO,
        );
        return res.status(201).json({ heartRateVariability });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make post request for adding many heart variability  models
  route.post(
    '/addManyHeartRateVariability',
    celebrate({
      body: Joi.array().items({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        variability: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addManyHeartRateSample endpoint with body: %o', req.body);
      try {
        const HeartRateVariabilityServiceInstance = Container.get(HeartRateVariabilityService);
        const { heartRateMany } = await HeartRateVariabilityServiceInstance.addManyHeartRateVariability(req.body);
        return heartRateMany;
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // deletes heart rate variability given an id
  route.delete('/deleteHeartRateVariabilityByID/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteHeartRateVariabilityByID endpoint');
    try {
      const id = req.params.id;
      const HeartRateVariabilityServiceInstance = Container.get(HeartRateVariabilityService);
      const heartRateVariability = await HeartRateVariabilityServiceInstance.deleteHeartRateVariabilityByID(id);
      return res.json({ heartRateVariability }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
  });
};
