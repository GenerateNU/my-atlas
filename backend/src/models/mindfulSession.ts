import { IMindfulSession } from '../interfaces/IMindfulSession';
import mongoose from 'mongoose';

const MindfulSession = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timeseries: {
      timeField: 'startDate',
    },
  },
);

export default mongoose.model<IMindfulSession & mongoose.Document>('MindfulSession', MindfulSession);
