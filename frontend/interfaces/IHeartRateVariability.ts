export interface IHeartRateVariability {
    _id: String;
    userID: String;
    startDate: Date;
    variability: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IHeartRateVariabilityDTO {
    userID: String;
    startDate: Date;
    variability: Number;
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  