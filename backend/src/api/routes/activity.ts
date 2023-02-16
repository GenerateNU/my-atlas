import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IActivityDTO } from '../../interfaces/IActivity';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import ActivityService from '../../services/activity';
import middlewares from '../middlewares';


const route = Router();


export default (app: Router) => {
app.use('/activity', route);


route.post(
'/addActivity',
celebrate({
  body: Joi.object({
    date: Joi.date().required(),
    userID: Joi.string().required(),
    dailyStepCountSamples: Joi.number(),
    dailyDistanceWalkingRunningSamples: Joi.number(),
    dailyDistanceSwimmingSamples: Joi.number(),
    dailyDistanceCyclingSamples: Joi.number(),
    dailyFlightsClimbedSamples: Joi.number(),
    activeEnergyBurned: Joi.number(),
    basalEnergyBurned: Joi.number(),
    appleStandTime: Joi.number(),
  }),
}),
// For most routes, include the two lines below. They are commented out
// here because it does not make sense to have them. To use route with middleware,
// must use bearer token generated when a user is signed up/ logged in
// middlewares.isAuth,
// middlewares.attachCurrentUser,
async (req: Request, res: Response, next: NextFunction) => {
  const logger:Logger = Container.get('logger');
  logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
  try {
    const ActivityServiceInstance = Container.get(ActivityService);
    const { activity} = await ActivityServiceInstance.addActivity(req.body as IActivityDTO);
    return res.status(201).json({ activity});
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
},
);


// If you want to use params to query, this is how you would want to
// create the route
route.get(
'/getActivityInfoByIDAndDate/:userID-date',
// For most routes, include the two lines below. They are commented out
// here because it does not make sense to have them
// middlewares.isAuth,
// middlewares.attachCurrentUser,
async (req: Request, res: Response, next: NextFunction) => {
  const logger:Logger = Container.get('logger');
  logger.debug('Calling getActivityInfoByIDAndDate endpoint');
  try {
   // retrieving correctly?
    const userID = req.params.userID;
    const date = new Date(req.params.date);


    const activityServiceInstance = Container.get(ActivityService);
    const { activity} = await activityServiceInstance.getActivityInfoByIDAndDate(userID, date);
    return res.json({ activity}).status(200);
  } catch (e) {
    logger.error('🔥 error: %o',  e );
    return next(e);
  }
},
);


// deletes activity given a userID and date
route.delete(
   '/deleteActivity/:userID-date',
   // For most routes, include the two lines below. They are commented out
   // here because it does not make sense to have them
   // middlewares.isAuth,
   // middlewares.attachCurrentUser,
   async (req: Request, res: Response, next: NextFunction) => {
     const logger: Logger = Container.get('logger');
     logger.debug('Calling deleteActivity endpoint');
     try {
       const userID = req.params.userID;
       const date = new Date(req.params.date);


       const ActivityServiceInstance = Container.get(ActivityService);
       const { activity } = await ActivityServiceInstance.deleteActivityByIDAndDate(userID, date);
       return res.json({ activity }).status(200);
     } catch (e) {
       logger.error(':fire: error: %o', e);
       return next(e);
     }
   },
 );


 route.patch(
   '/updateActivity',
   // For most routes, include the two lines below. They are commented out
   // here because it does not make sense to have them
   // middlewares.isAuth,
   // middlewares.attachCurrentUser,
   celebrate({
       body: Joi.object({
           date: Joi.date().required(),
           userID: Joi.string().required(),
           dailyStepCountSamples: Joi.number(),
           dailyDistanceWalkingRunningSamples: Joi.number(),
           dailyDistanceSwimmingSamples: Joi.number(),
           dailyDistanceCyclingSamples: Joi.number(),
           dailyFlightsClimbedSamples: Joi.number(),
           activeEnergyBurned: Joi.number(),
           basalEnergyBurned: Joi.number(),
           appleStandTime: Joi.number(),
       }),
   }),
   async (req: Request, res: Response, next: NextFunction) => {
     const logger: Logger = Container.get('logger');
     logger.debug('Calling updateActivity endpoint');
     try {
       const ActivityServiceInstance = Container.get(ActivityService);
       const { activity } = await ActivityServiceInstance.updateActivityByIDAndDate(req.body as IActivityDTO);
       return res.json({ activity }).status(200);
     } catch (e) {
       logger.error(':fire: error: %o', e);
       return next(e);
     }
   },
 )
};
