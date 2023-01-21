import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@/config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect('mongodb://localhost:27017/admin', {
    user: encodeURIComponent('root'),
    pass: encodeURIComponent('password'),
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
// config.databaseURL
