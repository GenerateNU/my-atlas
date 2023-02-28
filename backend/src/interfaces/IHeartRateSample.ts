export interface IHeartRateSample {
    _id: String;
    userID: String;
    startDate: Date;
    duration: Number;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IHeartRateSampleDTO {
    userID: String;
    startDate: Date;
    duration: Number;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  