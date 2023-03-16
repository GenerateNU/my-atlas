import { IHeadphoneAudioExposure, IHeadphoneAudioExposureDTO } from '@/interfaces/IHeadphoneAudioExposure';
import HeadphoneExposureSample from '@/services/headphoneAudioExposure';
import HeadphoneAudioExposure from '@/models/headphoneAudioExposure';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const HeadphoneAudioExposureServiceInstance = new HeadphoneAudioExposure(
  HeadphoneAudioExposure,
  LoggerInstance,
  eventDispatcher,
);

describe('Add HeadphoneAudioExposure document to database', () => {
  it('Add document', async done => {
    const dateRightNow = new Date();
    const headphoneAudioExposureExample: IHeadphoneAudioExposureDTO = {
      userID: '54321',
      startDate: dateRightNow,
      duration: 1000,
      value: 500,
      hkID: '54321',
    };
    const { headphoneAudioExposure } = await HeadphoneAudioExposureServiceInstance.addHeadphoneAudioExposure(
      headphoneAudioExposureExample,
    );
    const headphoneAudioExposureFromDB = await HeadphoneAudioExposure.findById(headphoneAudioExposure._id);
    expect(headphoneAudioExposureFromDB.userID).toEqual('54321');
    expect(headphoneAudioExposureFromDB.startDate).toEqual(dateRightNow);
    expect(headphoneAudioExposureFromDB.duration).toEqual(1000);
    expect(headphoneAudioExposureFromDB.value).toEqual(500);
    expect(headphoneAudioExposureFromDB.hkID).toEqual('54321');
    done();
  });
});
