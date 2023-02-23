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
      _id: "id",
      date: new Date(1478708162000),
      userID: "hiello",
      dailyStepCountSamples: 1000,
      dailyDistanceWalkingRunningSamples: 1298,
      dailyDistanceSwimmingSamples: 193,
      dailyDistanceCyclingSamples: 1234,
      dailyFlightsClimbedSamples: 238,
      activeEnergyBurned: 123,
      basalEnergyBurned: 23,
      appleStandTime: 3812,
    });
  } finally {
    exit(0);
  }
}
run();