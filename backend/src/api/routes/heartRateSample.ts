import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IHeartRateSampleDTO } from '../../interfaces/IHeartRateSample';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import HeartRateSampleService from '@/services/heartRateSample';
import middlewares from '../middlewares';
import ActivityService from '@/services/activity';

const route = Router();


export default (app: Router) => {
  app.use('/heartRateSample', route);

// make post request to add heartRateSample
route.post(
'/addHeartRateSample',
middlewares.isAuth, middlewares.authorizeUser,
celebrate({
 body: Joi.object({
   userID: Joi.string().required(),
   startDate: Joi.date().required(),
   duration: Joi.number().required(),
   bpm: Joi.number().required(),
   hkID: Joi.string().required(),
   hkWasUserEntered: Joi.boolean().required()
 }),
}),
async (req: Request, res: Response, next: NextFunction) => {
 const logger:Logger = Container.get('logger');
 logger.debug('Calling addHeartRateSample endpoint with body: %o', req.body );
 try {
   const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
   const heartRateSample = await HeartRateSampleServiceInstance.addHeartRateSample(req.body as IHeartRateSampleDTO);
   return res.status(201).json({ heartRateSample });
 } catch (e) {
   logger.error('🔥 error: %o', e);
   return next(e);
 }
},
);


// make get request to retrieve heart rate sample, given id
route.get(
'/getHeartRateSampleByID/id/:id/',
middlewares.isAuth, middlewares.authorizeUser,
async (req: Request, res: Response, next: NextFunction) => {
 const logger:Logger = Container.get('logger');
 logger.debug('Calling getHeartRateSampleByID endpoint');
 try {
   const id = req.params.id;
   const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
   const heartRateSample = await HeartRateSampleServiceInstance.getHeartRateSampleByID(id);
   return res.json({ heartRateSample }).status(200);
 } catch (e) {
   logger.error('🔥 error: %o',  e );
   return next(e);
 }
},
);


// deletes heart rate sample given an id
route.delete(
  '/deleteHeartRateSampleByID/id/:id',
  middlewares.isAuth, middlewares.authorizeUser,
  async (req: Request, res: Response, next: NextFunction) => {
  // make post request to add heartRateSample
  route.post(
    '/addHeartRateSample',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        bpm: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addHeartRateSample endpoint with body: %o', req.body);
      try {
        const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
        const heartRateSample = await HeartRateSampleServiceInstance.addHeartRateSample(
          req.body as IHeartRateSampleDTO,
        );
        return res.status(201).json({ heartRateSample });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make post request for adding many heart rate sample models
  route.post(
    '/addManyHeartRateSample',
    celebrate({
      body: Joi.array().items({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        bpm: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addManyHeartRateSample endpoint with body: %o', req.body);
      try {
        const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
        const { heartRateMany } = await HeartRateSampleServiceInstance.addManyHeartRateSample(req.body);
        return heartRateMany;
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make get request to retrieve heart rate sample, given id
  route.get('/getHeartRateSampleByID/id/:id/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getHeartRateSampleByID endpoint');
    try {
      const id = req.params.id;
      const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
      const heartRateSample = await HeartRateSampleServiceInstance.getHeartRateSampleByID(id);
      return res.json({ heartRateSample }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  // deletes heart rate sample given an id
  route.delete('/deleteHeartRateSampleByID/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteHeartRateSampleByID endpoint');
    try {
      const id = req.params.id;
      const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);

      const heartRateSample = await HeartRateSampleServiceInstance.deleteHeartRateSampleByID(id);
      return res.json({ heartRateSample }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
  });
};
