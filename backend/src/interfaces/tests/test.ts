import { MongoClient } from 'mongodb';
import { IHeadphoneExposure } from '@/interfaces/IHeadphoneExposure';
import userModel from '../models/user';
import mongoose from 'mongoose';
import { exit } from 'process';
import headphoneExposure from '../models/headphoneExposure';

async function run() {
  try {
    const mongoConnection = await mongoose.connect('mongodb://localhost:27017/admin', {
      user: encodeURIComponent('root'),
      pass: encodeURIComponent('password'),
    });
    const userRecord = await headphoneExposure.create({
      hk_id: 'random_id',
      timeStamp: '08/10/2222',
      duration: 300,
      value: 'Too high!',
      userEntered: true,
    });
  } finally {
    exit(0);
  }
}
run();
