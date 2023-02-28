import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import gps from './routes/gps';
import agendash from './routes/agendash';
import onboarding from './routes/onboarding';
import activity from './routes/activity';
import heartRateSample from './routes/heartRateSample';
import heartRateVariability from './routes/heartRateVariability';
import restingHeartRate from './routes/restingHeartRate';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  onboarding(app);
  activity(app);
  gps(app);
  heartRateSample(app);
  heartRateVariability(app);
  restingHeartRate(app);
  return app;
};



