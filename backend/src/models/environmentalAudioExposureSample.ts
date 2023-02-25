import { IEnvironmentalAudioExposureSample } from '../interfaces/IEnvironmentalAudioExposureSample';
import mongoose from 'mongoose';

const EnvironmentalAudioExposureSample = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true,
      required: true
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    hkID: {
      type: String,
      required: true
    }
  },
  {
    timeseries: {
      timeField: 'startDate',
    },
  }
);

export default mongoose.model<IEnvironmentalAudioExposureSample & mongoose.Document>(
  'EnvironmentalAudioExposureSample',
  EnvironmentalAudioExposureSample,
);
