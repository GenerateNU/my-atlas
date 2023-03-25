import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInputBase, View } from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { Button, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from "react";
import { IActivityDTO } from './interfaces/IActivity';
import { IHeartRateSampleDTO } from "./interfaces/IHeartRateSample";
import { IHeartRateVariabilityDTO } from "./interfaces/IHeartRateVariability";
import { IRestingHeartRateDTO } from './interfaces/IRestingHeartRate';
import { IHeadphoneExposureSampleDTO } from "./interfaces/IHeadphoneExposureSample";
import moment, { duration } from "moment";
import { IMindfulSessionDTO } from './interfaces/IMindfulSession';
import { ISleepSampleDTO } from "./interfaces/ISleepSample";
import { timeStamp } from 'console';


const userId: string = "Test User"; // User Id (Using Test Id for now)
const lastRetrievalDate = new Date(2023, 2, 16); // Last retrival date of the user
const readPermissions = ["StepCount", "DistanceWalkingRunning", "DistanceSwimming", "DistanceCycling",   // Activity Permissions
                        "FlightsClimbed", "ActiveEnergyBurned", "BasalEnergyBurned", "AppleStandTime",   // Activity Permissions
                        "HeartRate", "HeartRateVariability", "RestingHeartRate",                         // Heart Rate Related Permissions
                        "HeadphoneAudioExposure", "MindfulSession", "SleepAnalysis",];                   // Other Permissions


                                           
/* Permission options */
const permissions = {
  permissions: {
    write: [],
    read: readPermissions,
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log("[ERROR] Cannot grant permissions!");
  }

  /* Can now read or write to HealthKit */

  

});


export default function App() {
  console.log("****************");
  console.log(new Date().toLocaleString());
  getActivities(lastRetrievalDate);


  try {
    return (
      <View style={styles.container}>
        <Text>Hi, this is My Atlas, welcome!</Text>

        <Button
          title="Press Me to Add Heart Rate Samples to Database"

        />


      </View>
    );
  }
  catch (error) {
    return (
      <View style={styles.container}>
        <Text>Hi, this My Atlas, welcome.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * Gets the Healthkit data for the particular method using the given options
 * @param method healthkit method to call
 * @param options Healthkit options including data and acending 
 * @returns 
 */
async function retrieveHealthKitData(method: string, startDate: Date): Promise<HealthValue[]> {
  const options = {
    startDate: startDate.toISOString(),
    ascending: true,
  };
  return new Promise((resolve, reject) => {
    AppleHealthKit[method](
      options,
      (err: string, results: Array<HealthValue>) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
}


/**
 * Can get the activities, but needs to be wrapped in a promise. I would use this to send healthvalues 
 * @param startDate 
 */
async function getActivities(startDate: Date) {
  
  try {
    const steps : HealthValue[] = await retrieveHealthKitData("getDailyStepCountSamples", startDate)
    const walkingRunning : HealthValue[] = await retrieveHealthKitData("getDailyDistanceWalkingRunningSamples", startDate)
    const swimming : HealthValue[] = await  retrieveHealthKitData("getDailyDistanceSwimmingSamples", startDate)
    const cycling : HealthValue[] = await retrieveHealthKitData("getDailyDistanceCyclingSamples", startDate)
    const flights : HealthValue[]= await retrieveHealthKitData("getDailyFlightsClimbedSamples", startDate)
    const activeEnergy : HealthValue[] = await retrieveHealthKitData("getActiveEnergyBurned", startDate)
    const basalEnergy : HealthValue[] = await retrieveHealthKitData("getBasalEnergyBurned", startDate)
    const standTime : HealthValue[] = await retrieveHealthKitData("getAppleStandTime", startDate)

    const activitySamples: ActivityHealthValues = {
      steps, walkingRunning, swimming, cycling, flights,
      activeEnergy, basalEnergy, standTime
    }
    // Convert the Activities to IActivityDTO[]
    const activityDTOS : IActivityDTO[] = convertActivity(new Date(2023, 2, 16), activitySamples);

   
  } catch (err) {
    console.log(err);
  }

}
interface ActivityHealthValues {
  steps: Array<HealthValue>;
  walkingRunning: Array<HealthValue>;
  swimming: Array<HealthValue>;
  cycling: Array<HealthValue>;
  flights: Array<HealthValue>;
  activeEnergy: Array<HealthValue>;
  basalEnergy: Array<HealthValue>;
  standTime: Array<HealthValue>
}

/**
 * Convert the Activity to a list of a IActivtyDTO using a start date. This start date will typically be the last retrieval date
 * or something along those lines
 * @param startDate 
 * @param activityHealthValues 
 * @returns IActivityDTO[]
 */
function convertActivity(startDate: Date, activityHealthValues: ActivityHealthValues) : IActivityDTO[]{
  //let activtyDTOFields = ['steps', 'walkingRunning', 'swimming', 'cycling', 'flights', 'activeEnergy', 'basalEnergy', '']
  var activityDTOs : IActivityDTO[] = [];
  //console.log(startDate)
  var today = new Date();
  var daysBetween = 0;
  for (var d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
    let activityDTO: IActivityDTO = {
      userID: userId,
      date: d
    }
    updateActivityDTO(activityHealthValues, activityDTO, d, 'steps', 'dailyStepCountSamples');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'walkingRunning', 'dailyDistanceWalkingRunningSamples');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'swimming', 'dailyDistanceSwimmingSamples');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'cycling', 'dailyDistanceCyclingSamples');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'flights', 'dailyFlightsClimbedSamples');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'activeEnergy', 'activeEnergyBurned');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'basalEnergy', 'basalEnergyBurned');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'standTime', 'appleStandTime');
    // If only user and date no need to push
    if (Object.keys(activityDTO).length > 2){
      activityDTOs.push(activityDTO)
    }

  }
  return activityDTOs;
}

/**
 * Are these two dates the same?
 * @param date1
 * @param date2 
 * @returns boolean
 */
function sameDate(date1: Date, date2: Date): boolean {
  return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}

/**
 * activityDTO  object based on if the first date in activityHealthValues for the healthValueFieldName is equal to the given date
 * For example: activityHealthValues contains "steps". "steps" would be the healthValueFieldName. If the first HealthValue in "steps" 
 * has a date matching the given date update the dtoFieldName in activityDTO
 * @param activityHealthValues 
 * @param activityDTO 
 * @param date 
 * @param healthValueFieldName 
 * @param dtoFieldName 
 */
function updateActivityDTO(activityHealthValues: ActivityHealthValues, activityDTO: IActivityDTO, date: Date, healthValueFieldName: string, dtoFieldName: string ){
  if (activityHealthValues[healthValueFieldName].length > 0 && sameDate(new Date(activityHealthValues[healthValueFieldName][0].startDate), date)) {
    activityDTO[dtoFieldName] = activityHealthValues[healthValueFieldName].shift().value;
  }
}

/**
 * Converts array of HealthValues to array of IHeartRateSampleDTO.
 * @param heartRateSamples 
 * @returns Array<IHeartRateSampleDTO>
 */
function convertHeartRateSamples(heartRateSamples: Array<HealthValue>): Array<IHeartRateSampleDTO> {
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

/**
 * Converts array of HealthValues to array of IHeartRateVariabilityDTO.
 * @param heartRateVariabilities 
 * @returns Array<IHeartRateVariabilityDTO>
 */
function convertHeartRateVariabilities(heartRateVariabilities: Array<HealthValue>): Array<IHeartRateVariabilityDTO> {
  // Initialize array of IHeartRateSampleDTO
  var heartRateVariabilityDTOs: Array<IHeartRateVariabilityDTO> = [];
  heartRateVariabilities.forEach(sample => {
    const heartRateVariabilitity: IHeartRateVariabilityDTO = {
      userID: userId,
      startDate: new Date(sample.startDate),
      variability: Number(sample.value),
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
    }
    // Add each sample
    heartRateVariabilityDTOs.push(heartRateVariabilitity)
  }
  );
  return heartRateVariabilityDTOs;

}

/**
 * Converts array of HealthValues to array of IRestingHeartRateDTO.
 * @param heartRateVariabilities 
 * @returns Array<IRestingHeartRateDTO>
 */
function convertRestingHeartRate(restingHeartRate: Array<HealthValue>): Array<IRestingHeartRateDTO> {
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

/**
 * Converts array of HealthValues to array of IHeadphoneExposureSampleDTO.
 * @param headphoneExposureSamples 
 * @returns Array<IHeadphoneExposureSampleDTO>
 */
function convertHeadphoneExposureSamples(headphoneExposureSamples: Array<HealthValue>): Array<IHeadphoneExposureSampleDTO> {
  var headphoneExposureSampleDTOs: Array<IHeadphoneExposureSampleDTO> = [];
  headphoneExposureSamples.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const headphoneExposureSampleDTO: IHeadphoneExposureSampleDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
      value: sample.value,
      hkID: sample.id,
      //hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
    }
    // Add each sample
    headphoneExposureSampleDTOs.push(headphoneExposureSampleDTO)
  });
  return headphoneExposureSampleDTOs;
}

/**
 * Converts array of HealthValues to array of IMindfulSessionDTO.
 * @param mindfulSessions 
 * @returns Array<IMindfulSessionDTO>
 */
function convertMindfulSessions(mindfulSessions: Array<HealthValue>): Array<IMindfulSessionDTO> {
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

/**
 * Converts array of HealthValues to array of ISleepSampleDTO.
 * @param sleepSamples 
 * @returns 
 */
function convertSleepSamples(sleepSamples: Array<HealthValue>): Array<ISleepSampleDTO> {
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


/**
 * Computes the difference in dates in milliseconds for duration fields
 * @param date1 
 * @param date2 
 * @returns 
 */
function dateDifferenceInMilliSeconds(date1: Date, date2: Date): number {
  var date1Time: number = date1.getTime();
  var date2Time: number = date2.getTime();
  return Math.abs(date1Time - date2Time);


}




