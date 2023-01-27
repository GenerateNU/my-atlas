export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  dob: string;
  age: number;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
