import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthService';
import { ISleepSample, ISleepSampleDTO } from '../../interfaces/ISleepSample';

/**
 * 
 * @returns 
 */
export const addManySleepSample = async (userId : string , startDate: Date, endDate: Date) : Promise<ISleepSample[]> => {
    const sleepSamples : Array<HealthValue> = await retrieveHealthKitData("getMindfulSession", startDate, endDate);
    const sleepSampleDTOS : Array<ISleepSampleDTO>= convertSleepSamples(userId, sleepSamples);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/sleepSample/addManySleepSample', 
            sleepSampleDTOS)
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
 * Converts array of HealthValues to array of ISleepSampleDTO.
 * @param sleepSamples 
 * @returns 
 */
function convertSleepSamples(userId: string, sleepSamples: Array<HealthValue>): Array<ISleepSampleDTO> {
  var sleepSampleDTOS: Array<ISleepSampleDTO> = [];
  sleepSamples.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const sleepSampleDTO: ISleepSampleDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
      sleepState: sample.value.toString()
    }
    // Add each sample
    sleepSampleDTOS.push(sleepSampleDTO)
  });
  return sleepSampleDTOS;
}