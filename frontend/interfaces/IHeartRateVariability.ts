export interface IHeartRateVariability {
    _id: String;
    userID: String;
    startDate: Date;
    variability: Number; // Seconds?
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IHeartRateVariabilityDTO {
    userID: String;
    startDate: Date;
    variability: Number; // Seconds?
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  