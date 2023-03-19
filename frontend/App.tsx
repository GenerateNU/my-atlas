import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInputBase, View } from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { Button, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IHeartRateSampleDTO } from "./interfaces/IHeartRateSample";
import { IHeartRateVariabilityDTO } from "./interfaces/IHeartRateVariability";
import { IRestingHeartRateDTO } from './interfaces/IRestingHeartRate';
import { IHeadphoneExposureSampleDTO } from "./interfaces/IHeadphoneExposureSample";
import { IActivityDTO } from './interfaces/IActivity';


const testUserID :string= "Test User";


/* Permission options */
const permissions = {
  permissions: {
    write: ["HeartRate", "HeartRateVariability"],
    read: ["StepCount", "HeartRate", "HeartRateVariability", "RestingHeartRate", "SleepAnalysis"],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log("[ERROR] Cannot grant permissions!");
  }

  /* Can now read or write to HealthKit */

  let options = {
    unit: 'milliseconds', // optional; default 'second'
    startDate: new Date(2021, 0, 0).toISOString(), // required
    endDate: new Date().toISOString(), // optional; default now
    ascending: false, // optional; default false
    limit: 10, // optional; default no limit
  }

});

let options = {
  startDate: new Date(2020, 1, 1).toISOString(),
  //endDate: new Date(2023, 11, 25, 23, 59,59 ).toISOString(), // optional; default now
  //includeManuallyAdded: true, // optional: default true

};
export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  // const convertSample = (sample: any) => {
  //   const heartRate = 
  //   {
  //     userID: "Test User",
  //     startDate: sample.startDate,
  //     duration: 0,
  //     bpm: sample.value,
  //     hkID: sample.id,
  //     hkWasUserEntered: true
  //   }
  //   console.log(heartRate);
  //   return heartRate;
  // }
  // const sendHeartRate = () => {
  //   const size = data.length;
  //   const heartRateSamples = [];
  //   for (let i = 0; i < size; i++) {
  //     heartRateSamples.push(convertSample(data[i]));
  //   }
  //   for (let i = 0; i < size; i++) {
  //     const post= axios.post('http://localhost:3000/api/heartRateSample/addHeartRateSample', heartRateSamples[i])
  //     console.log(post)
  //   }
  // }


  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try { 
        var steps;
        AppleHealthKit.getHeartRateSamples(options, (err: Object, results: Array<HealthValue>) => {
        console.log("HEART")
        console.log(results);
        let result = results[1]
        let date1: Date= new Date(result.startDate);
        let date2 : Date= new Date(result.endDate);

        console.log(dateDifferenceInMiiliseconds(date1, date2))
        //console.log(convertHeartRateVariability(results[1]))
        if (err) {
          return;
        }
        setData(results);
      
      });

        
      } catch (error) {
        console.log("Error")
        //console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);


  try{
  return (
    <View style={styles.container}>
      <Text>Hi, this is My Atlas, welcome!</Text>
      <Button 
        title="Press Me to Add Heart Rate Samples to Database"
         
      />
      {/* <Text>Steps: {data}</Text> */}
      {/* <Text>userID: {data['onboarding']['userID']} </Text>
      <Text>Name: {data['onboarding']['nickname']} </Text>
      <Text>City: {data['onboarding']['city']} </Text>
      <Text>ZipCode: {data['onboarding']['zipcode']} </Text>
      <Text>Pronouns: {data['onboarding']['pronouns']} </Text>
      <Text>Religion: {data['onboarding']['religion']} </Text>
      <Text>Sexual Orientation: {data['onboarding']['sexualOrientation']} </Text>
      <Text>Concerns: {data['onboarding']['concerns']} </Text>

      <Text>Personaility Test Score: {data['onboarding']['personalityTestScore']} </Text>
      <Text>Identify Yourself: {data['onboarding']['identifyYourself']} </Text>
      <Text>Steps: {steps} </Text>
      
    
      <StatusBar style="auto" /> */}
    
    </View>
  );
  }
  catch (error){
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

// Daves Main Edits
interface ActivityHealthValues {
  dailyStepCountSamples:Array<HealthValue>;
  dailyDistanceWalkingRunningSamples:Array<HealthValue>;
  dailyDistanceSwimmingSamples: Array<HealthValue>;
  dailyDistanceCyclingSamples: Array<HealthValue>;
  dailyFlightsClimbedSamples: Array<HealthValue>;
  activeEnergyBurned: Array<HealthValue>;
  basalEnergyBurned: Array<HealthValue>;
  appleStandTime: Array<HealthValue>


}
function convertActivity(activityHealthValues: ActivityHealthValues) {
  const dailyStepCountSamples = activityHealthValues.dailyStepCountSamples.shift()
  return null;
}
function convertHeartRateSample(sample:HealthValue) : IHeartRateSampleDTO {
  const heartRateSampleDTO : IHeartRateSampleDTO= {
      userID: testUserID,
      startDate: new Date(sample.startDate),
      bpm: sample.value,
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
  }
  return heartRateSampleDTO;

}


function convertHeartRateVariability(sample:HealthValue) : IHeartRateVariabilityDTO {
  const heartRateVariabilityDTO : IHeartRateVariabilityDTO = {
      userID: testUserID,
      startDate: new Date(sample.startDate),
      variability: Number(sample.value),
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
  }
  return heartRateVariabilityDTO;

}

function convertRestingHeartRate(sample:HealthValue): IRestingHeartRateDTO{
  const heartRateVariabilityDTO : IRestingHeartRateDTO = {
    userID: testUserID,
    startDate: new Date(sample.startDate),
    bpm: Number(sample.value),
    hkID: sample.id,
    hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
}
  return heartRateVariabilityDTO
}

function convertHeadphoneExposureSample(sample: HealthValue) : IHeadphoneExposureSampleDTO{
  const headphoneExposureSampleDTO : IHeadphoneExposureSampleDTO = {
    userID: testUserID,
    startDate: new Date(sample.startDate),
    duration: 0,
    value: 0,
    hkID: sample.id,
    //hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
}
  return headphoneExposureSampleDTO;
}

/* 
Gets the difference between two dates in seconds. Date1 should be less than (earlier)
than Date2, or else the difference will be negative.
*/
function dateDifferenceInMiiliseconds(startDate: Date, endDate: Date): number{
  console.log(startDate)
  console.log(endDate)
  const startDateInSeconds : number = startDate.getTime();
  console.log(startDateInSeconds)
  const endDateInSeconds : number = endDate.getTime();
  console.log(endDateInSeconds)
  const difference = - startDateInSeconds + endDateInSeconds;
  return difference;
}