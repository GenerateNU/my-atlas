import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import {IOnboarding} from "@/interfaces/IOnboarding";
import { IActivity} from '../../interfaces/IActivity'
import { IGPS } from '../../interfaces/IGPS';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type OnboardingModel = Model<IOnboarding & Document>;
    export type ActivityModel = Model<IActivity & Document>
    export type GPSModel = Model<IGPS & Document>;
  }
}
