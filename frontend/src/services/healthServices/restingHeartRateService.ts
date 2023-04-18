import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthService';
import { IRestingHeartRate, IRestingHeartRateDTO } from '../../interfaces/IRestingHeartRate';

/**
 * 
 * @returns 
 */
export const addManyHeartRateSample = async (userId : string , startDate: Date, endDate: Date) : Promise<IRestingHeartRate[]> => {
    const restHeartRates : Array<HealthValue> = await retrieveHealthKitData("getMindfulSession", startDate, endDate);
    const restHeartRateDTOs : Array<IRestingHeartRateDTO>= convertRestingHeartRate(userId, restHeartRates);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/restingHeartRate/addManyRestingHeartRate', 
            restHeartRateDTOs)
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


/**
 * Converts array of HealthValues to array of IRestingHeartRateDTO.
 * @param heartRateVariabilities 
 * @returns Array<IRestingHeartRateDTO>
 */
function convertRestingHeartRate(userId: string, restingHeartRate: Array<HealthValue>): Array<IRestingHeartRateDTO> {
  var restingHeartRateDTOs: Array<IRestingHeartRateDTO> = [];
  restingHeartRate.forEach(sample => {
    const restingHeartRateDTO: IRestingHeartRateDTO = {
      userID: userId,
      startDate: new Date(sample.startDate),
      bpm: Number(sample.value),
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
    }
    // Add each sample
    restingHeartRateDTOs.push(restingHeartRateDTO);
  });
  return restingHeartRateDTOs;
}
