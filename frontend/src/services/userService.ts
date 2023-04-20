import axios from "axios";
import { IUser } from "../interfaces/IUser";

export const getUser = (token: string): Promise<IUser> => {
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get('http://localhost:3000/api/users/me', {headers})
          .then(
            response => {
              console.log(response.data);
              resolve(response.data);
            },
            error => {
              console.log(error.response.data.errors.message);
              reject(error.response.data.errors.message);
            },
          );
      });
    });
  };