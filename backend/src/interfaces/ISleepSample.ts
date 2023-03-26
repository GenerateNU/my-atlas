export interface ISleepSample {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  sleepState: string;
}

export interface ISleepSampleDTO {
  userID: string;
  startDate: Date;
  duration: number;
  sleepState: string;
}
