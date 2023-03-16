import { ISleepSampleDTO } from '@/interfaces/ISleepSample';
import SleepSampleService from '@/services/sleepSample';
import SleepSample from '@/models/sleepSample';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const SleepSampleServiceInstance = new SleepSampleService(SleepSample, LoggerInstance, eventDispatcher);

describe('Add SleepSample document to database', () => {
  it('Add document', async done => {
    const dateRightNow = new Date();
    const sleepSampleExample: ISleepSampleDTO = {
      userID: '12345',
      startDate: dateRightNow,
      duration: 100,
      sleepState: 'Shnocked',
    };
    const { sleepSample } = await SleepSampleServiceInstance.addSleepSample(sleepSampleExample);
    const sleepSampleFromDB = await SleepSample.findById(sleepSample._id);
    expect(sleepSampleFromDB.userID).toEqual('12345');
    expect(sleepSampleFromDB.startDate).toEqual(dateRightNow);
    expect(sleepSampleFromDB.duration).toEqual(1000);
    expect(sleepSampleFromDB.sleepState).toEqual('Shnocked');
    done();
  });
});
