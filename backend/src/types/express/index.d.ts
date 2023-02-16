import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import { IActivity} from '../../interfaces/IActivity'
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type ActivityModel = Model<IActivity & Document>
  }
}
