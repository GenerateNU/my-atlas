export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  age: number;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
  age: number;
}
