export interface IRestingHeartRate {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}

export interface IRestingHeartRateAverage {
  _id: string;
  averageBPM: number;
}
export interface IRestingHeartRateDTO {
  userID: string;
  startDate: Date;
  duration: number;
  bpm: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
