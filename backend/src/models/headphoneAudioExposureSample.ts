import { IHeadphoneExposureSample } from '../interfaces/IHeadphoneExposureSample';
import mongoose from 'mongoose';
//no error when line one is " '@/interfaces/IHeadPhoneExposure' " ... just changed file name

const HeadphoneAudioExposureSample = new mongoose.Schema(
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
    index: true,
    required: true
  },
  value: {
    type: Number,
    index: true,
    required: true
  }},
  {
    timeseries: {
      timeField: 'startDate',
    },
  }
);

export default mongoose.model<IHeadphoneExposureSample & mongoose.Document>(
  'HeadphoneAudioExposureSample',
  HeadphoneAudioExposureSample);
