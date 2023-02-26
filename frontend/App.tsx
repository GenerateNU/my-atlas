import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { Button, Alert } from 'react-native'

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
  startDate: new Date(2020, 1, 1, 0,0,0).toISOString(),
  endDate: new Date(2023, 11, 25, 23, 59,59 ).toISOString(), // optional; default now
  includeManuallyAdded: true, // optional: default true

};

var steps = 0;


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
  return (
    <View style={styles.container}>
      <Text>Hi, this is My Atlas, welcome.</Text>
      <Text>Name: {name} </Text>
      <Text>Steps: {steps} </Text>
    
      <StatusBar style="auto" />
      <Button 
            title="Minus Steps"
            onPress={() => Alert.alert(
              'Added Onboarding')}
        />
    </View>
  );
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