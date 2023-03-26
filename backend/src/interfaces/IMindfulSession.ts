export interface IMindfulSession {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
}

export interface IMindfulSessionDTO {
  userID: string;
  startDate: Date;
  duration: number;
}
