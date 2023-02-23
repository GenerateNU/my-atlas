import { MongoClient } from 'mongodb';
import { IUser } from '../src/interfaces/IUser';
import userModel from '../src/models/user';
import mongoose from 'mongoose';
import { exit } from 'process';

async function run() {
  try {
    const mongoConnection = await mongoose.connect('mongodb://localhost:27017/admin', {
      user: encodeURIComponent('root'),
      pass: encodeURIComponent('password'),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    const userRecord = await userModel.create({
      name: 'Test user',
      email: 'someting@eemail.com',
      phoneNumber: 9802978079,
      dob: '08/10/2222',
      age: 22,
      password: '123124',
      salt: 'salty',
    });
  } finally {
    exit(0);
  }
}
run();
