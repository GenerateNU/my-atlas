import { IEnvironmentalAudioExposureSample } from '../interfaces/IEnvironmentalAudioExposureSample';
import mongoose from 'mongoose';

const EnvironmentalAudioExposureSample = new mongoose.Schema(
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
    value: {
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

export default mongoose.model<IEnvironmentalAudioExposureSample & mongoose.Document>(
  'EnvironmentalAudioExposureSample',
  EnvironmentalAudioExposureSample,
);
