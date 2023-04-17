import { IUserInputDTO } from './IUser';

export interface IOnboardingFlowState {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
  age: number;
  soughtCare: boolean;
  spirituality: boolean;
}
