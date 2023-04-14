export interface IHeartRateSample {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}

export interface IHeartRateSampleAverage {
  _id: string;
  averageBPM: number;
}
export interface IHeartRateSampleDTO {
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
