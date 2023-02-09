import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IOnboardingInputDTO } from '@/interfaces/IOnboarding';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import OnboardingService from '@/services/onboarding';

const route = Router();
export default (app: Router) => {
  app.use('/onboarding', route);

  route.post(
    '/addOnboarding',
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        nickname: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.string(),
        religion: Joi.string(),
        religionOther: Joi.string(),
        ethnicity: Joi.string(),
        sexualOrientation: Joi.string(),
        identifyYourself: Joi.string(),
        gender: Joi.string(),
        genderOther: Joi.string(),
        pronouns: Joi.string(),
        pronounsOther: Joi.string(),
        concerns: Joi.array(),
        goals: Joi.array(),
        personalityTestScore: Joi.array(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.addOnboarding(req.body as IOnboardingInputDTO);
        return res.status(201).json({ onboarding });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // If you want to use params to query, this is how you would want to
  // create the route
  route.get(
    '/getOnboarding/:id',
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getOnboarding endpoint');
      try {
        const { id } = req.params;
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.getOnboarding(id);
        return res.json({ onboarding }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.delete(
    '/deleteOnboarding/:id',
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling deleteOnboarding endpoint');
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { message } = await OnboardingServiceInstance.deleteOnboardingByUserID(req.params.id);
        return res.json({ message }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.patch(
    '/updateOnboarding',
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        nickname: Joi.string(), 
        city: Joi.string(),
        zipcode: Joi.string(),
        religion: Joi.string(),
        religionOther: Joi.string(),
        ethnicity: Joi.string(),
        sexualOrientation: Joi.string(),
        identifyYourself: Joi.string(),
        gender: Joi.string(),
        genderOther: Joi.string(),
        pronouns: Joi.string(),
        pronounsOther: Joi.string(),
        concerns: Joi.array(),
        goals: Joi.array(),
        personalityTestScore: Joi.array(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling updateOnboarding endpoint');
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.updateOnboardingByUserID(req.body as IOnboardingInputDTO);
        return res.json({ onboarding }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
