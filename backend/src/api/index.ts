import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import user2 from './routes/user2';
import agendash from './routes/agendash';
import onboarding from './routes/onboarding';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  user2(app);
  onboarding(app);
  return app;
};
