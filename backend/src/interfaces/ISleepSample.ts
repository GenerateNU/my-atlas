export interface ISleepSample {
  _id: String;
  startDate: Date;
  duration: Number;
  sleepState: String;
}

export interface ISleepSampleDTO {
  startDate: Date;
  duration: Number;
  sleepState: String;
}
