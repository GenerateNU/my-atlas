import { IActivity } from '@/interfaces/IActivity';
import mongoose from 'mongoose';

// const Activity = new mongoose.Schema(
//   {
//     // tracker fields
//     date: {
//       type: String,
//       required: true,
//     }, // each day the user is active
//     dailyStepCountSamples: Number,
//     dailyDistanceWalkingRunningSamples: Number,
//     dailyDistanceSwimmingSamples: Number,
//     dailyDistanceCyclingSamples: Number,
//     dailyFlightsClimbedSamples: Number,
//     activeEnergyBurned: Number,
//     basalEnergyBurned: Number,
//     appleStandTime: Number, 
//     // tracks user id
//     metadata: {
//       type: {userID: String},
//       required: true,
//     },
//     timeseries: {
//       type: {
//          timeField: {
//             type: String,
//             required: true,
//          },
//          metaField: {
//             type: {userID: String},
//             required: true,
//          },
//       },
//     }
// }
// );

const Activity = new mongoose.Schema(
  {
    // tracker fields
    date: {
      type: Date,
      required: true,
    }, 
    userID: String,
    // each day the user is active
    dailyStepCountSamples: Number,
    dailyDistanceWalkingRunningSamples: Number,
    dailyDistanceSwimmingSamples: Number,
    dailyDistanceCyclingSamples: Number,
    dailyFlightsClimbedSamples: Number,
    activeEnergyBurned: Number,
    basalEnergyBurned: Number,
    appleStandTime: Number, 
  },
    {
      timeseries: {
        timeField: "date",
        metaField: "userID",
      },
    }
);

export default mongoose.model<IActivity & mongoose.Document>('Activity', Activity);
