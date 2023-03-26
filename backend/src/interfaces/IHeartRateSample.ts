export interface IHeartRateSample {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}

export interface IHeartRateSampleDTO {
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
