import { IEnvironmentalAudioExposure, IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import EnvironmentalAudioExposureService from '@/services/environmentalAudioExposure';
import EnvironmentalAudioExposure from '@/models/environmentalAudioExposure'
import LoggerInstance from "../src/loaders/logger";
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll (async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const EnvironmentalAudioExposureServiceInstance = new EnvironmentalAudioExposureService(EnvironmentalAudioExposure, LoggerInstance, eventDispatcher);

describe("Add EnvironmentalAudioExposure document to database", () => {
    it('Add document', async done => {
        const dateRightNow = new Date()
        const environmentalAudioExposureExample: IEnvironmentalAudioExposureDTO = {
            userID: '12345',
            startDate: dateRightNow,
            duration: 1000,
            value: 500,
            hkID: '12345'
        }
        const { environmentalAudioExposure } = await EnvironmentalAudioExposureServiceInstance.addEnvironmentalAudioExposure(environmentalAudioExposureExample);
        const environmentalAudioExposureFromDB = await EnvironmentalAudioExposure.findById(environmentalAudioExposure._id);
        expect(environmentalAudioExposureFromDB.userID).toEqual("12345");
        expect(environmentalAudioExposureFromDB.startDate).toEqual(dateRightNow);
        expect(environmentalAudioExposureFromDB.duration).toEqual(1000);
        expect(environmentalAudioExposureFromDB.value).toEqual(500);
        expect(environmentalAudioExposureFromDB.hkID).toEqual('12345');
        done();
    })
})