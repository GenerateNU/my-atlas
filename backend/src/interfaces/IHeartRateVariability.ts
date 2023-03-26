export interface IHeartRateVariability {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  variability: number;
  hkID: string;
  hkWasUserEntered: boolean;
}

export interface IHeartRateVariabilityDTO {
  userID: string;
  startDate: Date;
  duration: number;
  variability: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
