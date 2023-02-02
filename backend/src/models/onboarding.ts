import mongoose from 'mongoose';
import { IOnboarding } from '@/interfaces/IOnboarding';

const Onboarding = new mongoose.Schema(
  {
    userID: {
      type: Number,
      index: true
    },
    nickname: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    religion: {
      type: String,
      enum: ['None', 'Protestant', 'Catholic', 'Jewish', 'Muslim', 'Buddhist', 'Hindu'],
    },
    religionOther: String,
    sexualOrientation: {
      type: String,
    },
    identifyYourself: String,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'NonBinary'],
    },
    genderOther: String,
    pronouns: {
      type: String,
      enum: ['He/His', 'She/Her'],
    },
    pronounsOther: String,
    concerns: {
      type: [String],
    },
    goals: {
      type: [String],
    },
    personalityTestScore: {
      type: [Number],
      validate: [arrayLength, '5 Numbers are required'],
    },
  },
  { timestamps: true },
);

function arrayLength(val) {
  return val.length == 5;
}
export default mongoose.model<IOnboarding & mongoose.Document>('Onboarding', Onboarding);
