import mongoose from 'mongoose';
import { IOnboarding } from '@/interfaces/IOnboarding';

const Onboarding = new mongoose.Schema(
  {
    userID: {
      type: Number,
      required: true,
    },
    nickname: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    religion: {
      type: String,
      enum: ['None', 'Protestant', 'Catholic', 'Jewish', 'Muslim', 'Buddhist', 'Hindu', 'Other'],
      required: true,
    },
    ethnicity: {
      type: String,
      required: true,
    },
    sexualOrientation: {
      type: String,
      required: true,
    },
    identifyYourself: String,
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'NonBinary', 'Other'],
    },
    pronouns: {
      type: String,
      enum: ['He/His', 'She/Her', 'Other'],
      required: true,
    },
    concerns: {
      type: [String],
      required: true,
      // write validator
    },
    goals: {
      type: [String],
      required: true,
    },
    personalityTestScore: {
      type: [Number],
      required: true,
      validate: [arrayLength, '5 Numbers are required'],
    },
  },
  { timestamps: true },
);

function arrayLength(val) {
  return val.length == 5;
}
export default mongoose.model<IOnboarding & mongoose.Document>('Onboarding', Onboarding);
