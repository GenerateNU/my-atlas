import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthService';
import { IEnvironmentalAudioExposureSample, IEnvironmentalAudioExposureSampleDTO } from '../../interfaces/IEnvironmentalAudioExposureSample';

/**
 * 
 * @returns 
 */
export const addManyEnvironmentalAudioExposure = async (userId : string , startDate: Date, endDate: Date) : Promise<IEnvironmentalAudioExposureSample[]> => {
    const environmentAudios : Array<HealthValue> = await retrieveHealthKitData("getMindfulSession", startDate, endDate);
    const environmentAudioDTOS : Array<IEnvironmentalAudioExposureSampleDTO>= convertEnvironmentAudioSamples(userId, environmentAudios);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/environmentalAudioExposure/addManyEnvironmentalAudioExposure', 
            environmentAudioDTOS)
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
 * 
 * @param userId 
 * @param mindfulSessions 
 * @returns 
 */
function convertEnvironmentAudioSamples(userId: string, environmentAudios: Array<HealthValue>): Array<IEnvironmentalAudioExposureSampleDTO> {
  var environmentAudioDTOS: Array<IEnvironmentalAudioExposureSampleDTO> = [];
  environmentAudios.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const environmentalAudioExposureSampleDTO: IEnvironmentalAudioExposureSampleDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
      value: sample.value,
      hkID: sample.id
    }
    // Add each sample
    environmentAudioDTOS.push(environmentalAudioExposureSampleDTO)
  });
  return environmentAudioDTOS;
}
