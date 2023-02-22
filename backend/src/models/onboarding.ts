import mongoose from 'mongoose';
import { IOnboarding } from '@/interfaces/IOnboarding';
import e from 'express';

const Onboarding = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
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
      enum: ['He/Him', 'She/Her'],
    },
    pronounsOther: String,
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
function arrayLength(val:Number[]) {
  return val.length == 5;
}
export default mongoose.model<IOnboarding & mongoose.Document>('Onboarding', Onboarding);