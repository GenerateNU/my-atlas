export interface IHeartRateSample {
    _id: string;
    userID: string;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }
  
  export interface IHeartRateSampleDTO {
    userID: String;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }
  