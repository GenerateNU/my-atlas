import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthService';
import { IActivityDTO } from '../../interfaces/IActivity';
import { IMindfulSession, IMindfulSessionDTO } from '../../interfaces/IMindfulSession';

/**
 * 
 * @returns 
 */
export const addManyHeartRateSample = async (userId : string , startDate: Date, endDate: Date) : Promise<IMindfulSession[]> => {
    const mindfulSessions : Array<HealthValue> = await retrieveHealthKitData("getMindfulSession", startDate, endDate);
    const mindfulSessionDTOS : Array<IMindfulSessionDTO>= convertMindfulSessions(userId, mindfulSessions);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/mindfulSession/addManyMindfulSessoin', 
            mindfulSessionDTOS)
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
function convertMindfulSessions(userId: string, mindfulSessions: Array<HealthValue>): Array<IMindfulSessionDTO> {
  var mindfulSessionDTOs: Array<IMindfulSessionDTO> = [];
  mindfulSessions.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const mindfulSessionDTO: IMindfulSessionDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
    }
    // Add each sample
    mindfulSessionDTOs.push(mindfulSessionDTO)
  });
  return mindfulSessionDTOs;
}
