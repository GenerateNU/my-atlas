export interface IRestingHeartRate {
    _id: String;
    userID: String;
    startDate: Date;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IRestingHeartRateDTO {
    userID: String;
    startDate: Date;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  