export interface IHeadphoneExposureSample {
  _id: String;
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}

export interface IHeadphoneExposureSampleDTO {
  userID: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkID: String;
}
