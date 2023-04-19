import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { IActivityDTO } from '../../interfaces/IActivity';
import { IHeartRateSample, IHeartRateSampleDTO } from '../../interfaces/IHeartRateSample';



/**
 * 
 * @returns 
 */
export const addManyHeartRateSample = async (userId:string, authToken:string, startDate: Date, endDate: Date) : Promise<IHeartRateSample[]> => {
  try{
  const headers = {
    'Authorization': 'Bearer ' + authToken,
  };
  const heartRateSamples : Array<HealthValue> = await retrieveHealthKitData("getHeartRateSamples", startDate, endDate);

    const heartRateSampleDTOs : Array<IHeartRateSampleDTO>= convertHeartRateSamples(userId, heartRateSamples);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/heartRateSample/addManyHeartRateSample', 
            heartRateSampleDTOs,
            {headers})
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
    }
    catch (error){
      console.log(error)
    }
};

/**
 * Converts array of HealthValues to array of IHeartRateSampleDTO.
 * @param heartRateSamples 
 * @returns Array<IHeartRateSampleDTO>
 */
function convertHeartRateSamples(userId: string, heartRateSamples: Array<HealthValue>): Array<IHeartRateSampleDTO> {
  // Initialize array of IHeartRateSampleDTO
  var heartRateSampleDTOs: Array<IHeartRateSampleDTO> = [];
  heartRateSamples.forEach(sample => {
    const heartRateSampleDTO: IHeartRateSampleDTO = {
      userID: userId,
      startDate: new Date(sample.startDate),
      bpm: sample.value,
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
    }
    // Add each sample
    heartRateSampleDTOs.push(heartRateSampleDTO)
  }
  );
  return heartRateSampleDTOs;
}
  