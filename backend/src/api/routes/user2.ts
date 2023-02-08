import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IUserInputDTO } from '@/interfaces/IUser';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import UserService from '@/services/user';

const route = Router();

export default (app: Router) => {
  app.use('/user2', route);

  route.post(
    '/addUser',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        dob: Joi.string().required(),
        age: Joi.number().required(),
      }),
    }),
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them. To use route with middleware,
    // must use bearer token generated when a user is signed up/ logged in
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const UserServiceInstance = Container.get(UserService);
        const { user } = await UserServiceInstance.addUser(req.body as IUserInputDTO);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // If you want to use params to query, this is how you would want to
  // create the route
  route.get(
    '/getUserInfo/:id',
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getUserInfo endpoint');
      try {
        const { id } = req.params;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.getUser(id);
        return res.json({ user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // If you want to use body to query, this is how you would want to
  // create the route
  route.get(
    '/getUserInfoFromEmail',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getUserInfoFromEmail endpoint');
      try {
        const { email } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.getUserFromEmail(email);
        return res.json({ user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
