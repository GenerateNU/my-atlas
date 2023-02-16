import { ISleepSample } from '../interfaces/ISleepSample';
import mongoose from 'mongoose';

const SleepSample = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
  },
  timeStamp: {
    type: String,
    index: true,
  },
  duration: {
    type: Number,
    index: true,
  },
  sleepState: {
    type: String,
    index: true,
  },
});

export default mongoose.model<ISleepSample & mongoose.Document>('SleepSample', SleepSample);
