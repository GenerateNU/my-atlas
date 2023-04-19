import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { IActivityDTO } from '../../interfaces/IActivity';
import { IMindfulSession, IMindfulSessionDTO } from '../../interfaces/IMindfulSession';

/**
 * 
 * @returns 
 */
export const addManyMindfulSession = async (userId : string, authToken: string,  startDate: Date, endDate: Date) : Promise<IMindfulSession[]> => {
  try{  
    const headers = {
      'Authorization': 'Bearer ' + authToken,
    };
    const mindfulSessions : Array<HealthValue> = await retrieveHealthKitData("getMindfulSession", startDate, endDate);
    const mindfulSessionDTOS : Array<IMindfulSessionDTO>= convertMindfulSessions(userId, mindfulSessions);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/mindfulSession/addManyMindfulSession', 
            mindfulSessionDTOS,
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
      console.log(error);
    }
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
