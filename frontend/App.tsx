import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
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
  date: new Date().toISOString(), // optional; default now
  includeManuallyAdded: false, // optional: default true
};

var steps;

AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
  if (err) {
    return;
  }
  steps = results.value;
  console.log(results);
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi, this is My Atlas, welcome.</Text>
      <Text>Steps: {steps} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});