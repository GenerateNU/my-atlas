export interface ISleepSample {
  _id: String;
  userID: String;
  startDate: Date;
  duration: Number;
  sleepState: String;
}

export interface ISleepSampleDTO {
  userID: String;
  startDate: Date;
  duration: Number;
  sleepState: String;
}
