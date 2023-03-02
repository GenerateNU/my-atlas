export interface IHeartRateSample {
    _id: String;
    userID: String;
    startDate: Date;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IHeartRateSampleDTO {
    userID: String;
    startDate: Date;
    bpm: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  