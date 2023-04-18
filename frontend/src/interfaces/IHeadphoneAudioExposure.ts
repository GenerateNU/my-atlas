export interface IHeadphoneAudioExposure {
  _id: String;
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}

export interface IHeadphoneAudioExposureDTO {
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}
