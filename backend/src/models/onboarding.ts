import mongoose from 'mongoose';
import { IOnboarding } from '@/interfaces/IOnboarding';
import e from 'express';

const Onboarding = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      index: true,
    },
    city: String,
    zipcode: Number,
    religion: String,
    religionOther: String,
    sexualOrientation: String,
    identifyYourself: String,
    ethnicity: String,
    gender: String,
    genderOther: String,
    pronouns: String,
    pronounsOther: String,
    spiritual: Boolean,
    sexAssignedAtBirth: String,
    mentalHealthCare: String,
    haveSoughtCare: String,
    concerns: {
      type: [String],
      default: undefined,
    },
    goals: {
      type: [String],
      default: undefined,
    },
    personalityTestScore: {
      type: [Number],
      default: undefined,
      validate: [arrayLength, 'Five Numbers are required'],
    },
  },
  { timestamps: true },
);

// Check that the array length is 5
function arrayLength(val: number[]) {
  return val.length == 5;
}
export default mongoose.model<IOnboarding & mongoose.Document>('Onboarding', Onboarding);
