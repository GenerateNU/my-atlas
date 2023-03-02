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
    const onboardingUpdate: IOnboardingInputDTO = {
      userID: 'userTest',
      city: 'Boston',
      zipcode: 2120,
      religion: 'None',
      religionOther: 'Lol Jk RELIGION',
      ethnicity: 'Ethnic',
      sexualOrientation: "yes",
      identifyYourself: 'sure',
      gender: 'Male',
      genderOther: 'OtherTest',
      pronouns: 'He/Him',
      pronounsOther: 'Nah',
      concerns: ['concern1', 'concern2'],
      goals: ['goal1', 'goal2'],
      personalityTestScore: [1, 2, 3, 4, 5],
    };
    const onboardingDB2 = await onboardingServiceInstance.getOnboarding(onboardingExample.userID);
    expect(onboardingDB2.onboarding.zipcode).toEqual(2120);
    expect(onboardingDB2.onboarding.city).toEqual('Boston');
    expect(onboardingDB2.onboarding.religion).toEqual('None');
    expect(onboardingDB2.onboarding.religionOther).toEqual('Lol Jk RELIGION');
    expect(onboardingDB2.onboarding.ethnicity).toEqual('Ethnic');
    expect(onboardingDB2.onboarding.sexualOrientation).toEqual('yes');
    expect(onboardingDB2.onboarding.identifyYourself).toEqual('sure');

    expect(onboardingDB2.onboarding.gender).toEqual('Male');

    expect(onboardingDB2.onboarding.genderOther).toEqual('OtherTest');
    expect(onboardingDB2.onboarding.pronouns).toEqual('He/Him');
    expect(onboardingDB2.onboarding.pronounsOther).toEqual('Nah');

    expect(onboardingDB2.onboarding.concerns).toEqual(['concern1', 'concern2']);

    expect(onboardingDB2.onboarding.goals).toEqual(['goal1', 'goal2']);

    expect(onboardingDB2.onboarding.personalityTestScore).toEqual([1, 2, 3, 4, 5]);




    done();
  });
});
