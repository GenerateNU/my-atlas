export interface IHeadphoneExposureSample {
  _id: String;
  startDate: Date;
  duration: Number;
  value: Number;
  hkId: String;
}

export interface IHeadphoneExposureSampleDTO {
  startDate: Date;
  duration: Number;
  value: Number;
  hkId: String;
}
