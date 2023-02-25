import { IGPSInputDTO } from '../src/interfaces/IGPS';
import GPSService from '../src/services/gps';
import Gps from '../src/models/gps';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const gpsServiceInstance = new GPSService(Gps, LoggerInstance, eventDispatcher);

describe('Add User document to database', () => {
  it('Add document', async done => {
    const gpsExample: IGPSInputDTO = {
      userID: 'first-user',
      latitude: 20,
      longitude: 30,
      altitude: 10,
      accuracy: 50,
      timestamp: new Date(1478708162000),
    };
    const { gps } = await gpsServiceInstance.addGPS(gpsExample);
    const gpsDB = await Gps.findById(gps.userID);
    expect(gpsDB.latitude).toEqual(30);
    expect(gpsDB.accuracy).toEqual(50);
    done();
  });
});
