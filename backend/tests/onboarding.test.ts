import { IOnboardingInputDTO } from '../src/interfaces/IOnboarding';
import OnboardingService from '../src/services/onboarding';
import Onboarding from '../src/models/onboarding';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const onboardingServiceInstance = new OnboardingService(Onboarding, LoggerInstance, eventDispatcher);

describe('Add onboarding document to database', () => {
  it('Add document', async done => {
    const onboardingExample: IOnboardingInputDTO = {
      userID: 'userTest',
      nickname: 'Timmy',
    };
    await onboardingServiceInstance.addOnboarding(onboardingExample);
    const onboardingDB = await onboardingServiceInstance.getOnboarding(onboardingExample.userID);
    expect(onboardingDB.onboarding.nickname).toEqual('Timmy');
    done();
  });
});
