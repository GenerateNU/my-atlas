export interface IOnboarding {
    _id: string;
    nickname?: string;
    city?: string;
    zipcode?: number;
    religion?: string;
    religionOther?: string;
    ethnicity?: string;
    sexualOrientation?: string;
    sexAssignedAtBirth?: string;
    mentalHealthCare?: string;
    haveSoughtCare?: boolean;
    identifyYourself?: string;
    gender?: string;
    genderOther?: string;
    pronouns?: string;
    pronounsOther?: string;
    spiritual?: boolean;
    concerns?: string[];
    goals?: string[];
    personalityTestScore?: number[];
  }
  
  export interface IOnboardingDTO {
    nickname?: string;
    city?: string;
    zipcode?: number;
    religion?: string;
    religionOther?: string;
    ethnicity?: string;
    sexualOrientation?: string;
    sexAssignedAtBirth?: string;
    mentalHealthCare?: string;
    haveSoughtCare?: boolean;
    identifyYourself?: string;
    gender?: string;
    genderOther?: string;
    pronouns?: string;
    pronounsOther?: string;
    spiritual?: boolean;
    concerns?: string[];
    goals?: string[];
    personalityTestScore?: number[];
  }
  