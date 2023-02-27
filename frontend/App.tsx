import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInputBase, View } from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { Button, Alert } from 'react-native'
import axios from 'axios';
import React, { useEffect, useMemo, useState } from "react";
import useAxiosPost from "axios-hooks";



/* Permission options */
const permissions = {
  permissions: {
    write: ["StepCount"],
    read: ["StepCount"],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log("[ERROR] Cannot grant permissions!");
  }

  /* Can now read or write to HealthKit */

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    }
  );
});

let options = {
  //startDate: new Date(2020, 1, 1, 0,0,0).toISOString(),
  //endDate: new Date(2023, 11, 25, 23, 59,59 ).toISOString(), // optional; default now
  includeManuallyAdded: true, // optional: default true

};

var steps;
AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
  console.log(options)
  if (err) {
    return;
  }
  steps = results.value;
  console.log(results);
});
var name = "Dave"

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try { 
        console.log("Here")
        var values = {
          "userID" : "5",
          "nickname" : "Dave",
          "city" : "Boston",
          "zipcode": "02115",
          "religion": "None",
          "ethnicity": "ethnicty",
          "sexualOrientation": "sexual orientation",
          "identifyYourself": "identify yourself test",
          "gender": "Male",
          "pronouns": "He/Him",
          "concerns": ["Concern 1", "Concern 2", "Concern 3"],
          "goals": ["Goal 1", "Goal 2"],
          "personalityTestScore" : [10, 20, 30, 40, 50]
          
          }
        
        //const {data: response} = await axios.post('http://localhost:3000/api/onboarding/addOnboarding', values);
        
        const {data: response} = await axios.get('http://localhost:3000/api/onboarding/getOnboarding/2');
        setData(response);
        console.log(response)
        console.log(data)
        
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
      <Text>Hi, this is My Atlas, welcome.</Text>
     
      <Text>userID: {data['onboarding']['userID']} </Text>
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
      
    
      <StatusBar style="auto" />
    
    </View>
  );
  }
  catch (error){
    return (
      <View style={styles.container}>
      <Text>Hi, this is My Atlas, welcome.</Text>
      </View>
    )
  }
}

function  minusSteps(){
  steps = 100
  name = "James"

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

