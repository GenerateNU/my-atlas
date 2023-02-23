import { IEnvironmentalAudioExposureSample } from '../interfaces/IEnvironmentalAudioExposureSample';
import mongoose from 'mongoose';

const EnvironmentalAudioExposureSample = new mongoose.Schema(
  {
    _id: {
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
    hkId: {
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
