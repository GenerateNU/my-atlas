import { ISleepSample } from '../interfaces/ISleepSample';
import mongoose from 'mongoose';

const SleepSample = new mongoose.Schema(
  {
    _id: {
      type: String,
      index: true,
      required: true
    },
    startDate: {
      type: Date,
      index: true,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    sleepState: {
      type: String,
      required: false
    },
  },
  {
    timeseries: {
      timeField: 'startDate',
    },
  }
);

export default mongoose.model<ISleepSample & mongoose.Document>('SleepSample', SleepSample);
