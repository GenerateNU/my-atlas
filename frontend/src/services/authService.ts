import axios from 'axios';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

export type AuthData = {
  user: IUser;
  token: string;
};

const signIn = (email: string, password: string): Promise<AuthData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post('http://localhost:3000/api/auth/signIn', {
          email,
          password,
        })
        .then(
          response => {
            console.log(response.data);
            resolve({
              user: response.data.user,
              token: response.data.token,
            });
          },
          error => {
            console.log(error.response.data.errors.message);
            reject(error.response.data.errors.message);
          },
        );
    });
  });
};

const signUp = (userInput: IUserInputDTO): Promise<AuthData> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/auth/signUp', {
              ...userInput
            })
            .then(
              response => {
                console.log(response.data);
                resolve({
                  user: response.data.user,
                  token: response.data.token,
                });
              },
              error => {
                console.log(error.response.data.errors.message);
                reject(error.response.data.errors.message);
              },
            );
        });
      });
}

export const authService = {
  signIn,
  signUp
};