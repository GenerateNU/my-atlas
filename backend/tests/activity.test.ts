import { MongoClient } from 'mongodb';
import { IActivity } from '../src/interfaces/IActivity';
import Activity from '../src/models/activity';
import mongoose from 'mongoose';
import { exit } from 'process';

import { IActivityDTO } from '../src/interfaces/IActivity';
import AuthService from '../src/services/auth';
import User from "../src/models/user";
import LoggerInstance from "../src/loaders/logger";
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll (async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const authServiceInstance = new AuthService(User, Activity, LoggerInstance, eventDispatcher);


describe("Add Activity document to database", () => {
  it('Add document', async done => {
    const activityExample: IActivityDTO = {
      date: new Date(1478708162000),
      userID: "hiello",
      dailyStepCountSamples: 123123,
      dailyDistanceWalkingRunningSamples: 1298,
      dailyDistanceSwimmingSamples: 193,
      dailyDistanceCyclingSamples: 1234,
      dailyFlightsClimbedSamples: 238,
      activeEnergyBurned: 123,
      basalEnergyBurned: 23,
      appleStandTime: 3812
    }
    // const {activity, token} = await authServiceInstance.AddActivity(activityExample);
    const {activity} = await authServiceInstance.AddActivity(activityExample);
    const activityFromDB = await Activity.findById(activity._id);
    expect(activityFromDB.userID).toEqual("hiello");
    expect(activityFromDB.dailyStepCountSamples).toEqual(1000);
    done();
  })
})

// async function run() {
//   try {
//     const mongoConnection = await mongoose.connect('mongodb://localhost:27017/admin', {
//       user: encodeURIComponent('root'),
//       pass: encodeURIComponent('password'),
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });
//     const activityRecord = await activityModel.create({
//       date: new Date(1478708162000),
//       userID: "hiello",
//       dailyStepCountSamples: 1000,
//       dailyDistanceWalkingRunningSamples: 1298,
//       dailyDistanceSwimmingSamples: 193,
//       dailyDistanceCyclingSamples: 1234,
//       dailyFlightsClimbedSamples: 238,
//       activeEnergyBurned: 123,
//       basalEnergyBurned: 23,
//       appleStandTime: 3812,
//     });
//   } finally {
//     exit(0);
//   }
// }
// run();