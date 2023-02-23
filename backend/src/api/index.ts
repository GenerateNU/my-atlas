import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import onboarding from './routes/onboarding';
import activity from './routes/activity';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  onboarding(app);
  activity(app);
  return app;
};


