export interface IEnvironmentalAudioExposureSample {
  _id: String;
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}

export interface IEnvironmentalAudioExposureSampleDTO {
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}
