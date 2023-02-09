import { IActivity } from '@/interfaces/IActivity';
import mongoose from 'mongoose';

// CREATING COLLECTION TO STORE DATA
const Activity = new mongoose.Schema(
  {
    // tracker fields
    date: {
      type: String,
      required: true,
    }, // each day the user is active
    dailyStepCountSamples: Number,
    dailyDistanceWalkingRunningSamples: Number,
    dailyDistanceSwimmingSamples: Number,
    dailyDistanceCyclingSamples: Number,
    dailyFlightsClimbedSamples: Number,
    activeEnergyBurned: Number,
    basalEnergyBurned: Number,
    appleStandTime: Number, // what kind of time data we should use??
    // tracks user id
    metadata: {
      type: {userID: String},
      required: true,
    },
    timeseries: {
      type: {
         timeField: {
            type: String,
            required: true,
         },
         metaField: {
            type: {userID: String},
            required: true,
         },
      },
    }
}
);

export default mongoose.model<IActivity & mongoose.Document>('Activity', Activity);