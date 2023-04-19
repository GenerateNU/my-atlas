import { IUserInputDTO } from './IUser';

export interface IOnboardingFlowState {
  email: string;
  password: string
  name: string;
  phoneNumber: string;
  pronouns: string;
  dob: string;
  zipcode: string;
  sexAssignedAtBirth: string;
  genderIdentity: string;
  sexualOrientation: string;
  ethnicity: string;
  religion: string;
  mentalHealthStance: string;
  soughtCare: boolean;
  spirituality: boolean;
}
