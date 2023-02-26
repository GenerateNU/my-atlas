export interface IEnvironmentalAudioExposure {
  _id: String;
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}

export interface IEnvironmentalAudioExposureDTO {
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}
