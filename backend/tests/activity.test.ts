import { MongoClient } from 'mongodb';
import { IActivity } from '../src/interfaces/IActivity';
import activityModel from '../src/models/activity';
import mongoose from 'mongoose';
import { exit } from 'process';
​
async function run() {
  try {
    const mongoConnection = await mongoose.connect('mongodb://localhost:27017/admin', {
      user: encodeURIComponent('root'),
      pass: encodeURIComponent('password'),
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    const activityRecord = await activityModel.create({
      date: '08/10/2022',
      dailyStepCountSamples: 1000,
      dailyDistanceWalkingRunningSamples: 1298,
      dailyDistanceSwimmingSamples: 193,
      dailyDistanceCyclingSamples: 1234,
      dailyFlightsClimbedSamples: 238,
      activeEnergyBurned: 123,
      basalEnergyBurned: 23,
      appleStandTime: 3812,
      metadata: {userID: 'userID'},
      timeseries: {
         timeField: '08/10/2022',
         metaField: {userID: 'userID'},
      },
    });
  } finally {
    exit(0);
  }
}
run();