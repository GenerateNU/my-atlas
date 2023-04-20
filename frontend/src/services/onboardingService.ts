import axios from 'axios';
import { IOnboarding, IOnboardingDTO } from '../interfaces/IOnboardingDTO';

const addOnboarding = (onboarding : IOnboardingDTO, authToken : string): Promise<IOnboarding> => {
    const headers = {
        'Authorization': 'Bearer' + authToken
    }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post('http://localhost:3000/api/onboarding/addOnboarding',
          onboarding,
          {headers})
        .then(
          response => {
            console.log(response.data);
            resolve(
                response.data
            );
          },
          error => {
            console.log(error.response.data.errors.message);
            reject(error.response.data.errors.message);
          },
        );
    });
  });
};

const updateOnboardingByUserID = (onboarding : IOnboardingDTO, userID : string, authToken : string): Promise<IOnboarding> => {
    const headers = {
        'Authorization': 'Bearer ' + authToken
    }
    console.log(authToken)
    console.log(userID)
    const onboardingDTO = {
        ...onboarding,
        userID : userID,
        personalityTestCompleted : true
    }
    console.log(onboardingDTO)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .patch('http://localhost:3000/api/onboarding/updateOnboarding',
              onboardingDTO,
              {headers}
            )
            .then(
              response => {
                console.log(response.data);
                resolve(
                  response.data
                );
              },
              error => {
                console.log(error);
                reject(error);
              },
            );
        });
      });
}

export const onboardingService = {
  addOnboarding,
  updateOnboardingByUserID
};