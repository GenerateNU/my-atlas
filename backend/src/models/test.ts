import { MongoClient } from 'mongodb';
import { IUser } from '@/interfaces/IUser';
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "'mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('testDb');
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const user = database.collection<IUser>('User');
    const result = await user.insertOne({
      _id: '12424',
      name: 'Graham mather',
      email: 'someting@eemail.com',
      phoneNumber: 9802978079,
      dob: '08/10/2222',
      age: 22,
      password: '123124',
      salt: 'salty',
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
