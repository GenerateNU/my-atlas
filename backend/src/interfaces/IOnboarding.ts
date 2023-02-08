export interface IOnboarding {
  userID: number;
  nickname: string;
  city: string;
  zipcode: number;
  religion: string;
  ethnicity: string;
  sexualOrientation: string;
  identifyYourself: string;
  gender: string;
  pronouns: string;
  concerns: string[];
  goals: string[];
  personalityTestScore: number[];
}

export interface IOnboardingInputDTO {
  userID: number;
  nickname: string;
  city: string;
  zipcode: number;
  religion: string;
  ethnicity: string;
  sexualOrientation: string;
  identifyYourself: string;
  gender: string;
  pronouns: string;
  concerns: string[];
  goals: string[];
  personalityTestScore: number[];
}
