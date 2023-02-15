import { IHeadphoneExposure } from '@/interfaces/IHeadphoneExposure';
import mongoose from 'mongoose';
//no error when line one is " '@/interfaces/IHeadPhoneExposure' " ... just changed file name

const HeadphoneExposure = new mongoose.Schema({
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
  value: {
    type: String,
    index: true,
  },
});

export default mongoose.model<IHeadphoneExposure & mongoose.Document>('HeadphoneExposure', HeadphoneExposure);
