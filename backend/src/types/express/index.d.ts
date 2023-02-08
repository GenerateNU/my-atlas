import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import {IOnboarding} from "@/interfaces/IOnboarding";
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type OnboardingModel = Model<IOnboarding & Document>;
  }
}
