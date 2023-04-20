import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Router from './src/navigation/Router';
import ScreenWideButton from './src/components/question/ScreenWideButton';

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
    console.log('[ERROR] Cannot grant permissions!');
  }

  /* Can now read or write to HealthKit */

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(options, (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  });
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
  // colors used in our app
  const theme = extendTheme({
    colors: {
      midnight: '#271E41',
      miniPeach: '#FAF4F0',
      cream: '#E5E5E5',
      coal: "#8F8F8F",
      nectarine: '#F1C3A9',
      nectarineDark: '#ED9E72',
      terra: '#C55415',
      gray: '#666666',
      lilac: '#F5F6FF',
      lightPurple: '#E8EAF6',
      lightGray: '#808080',
      lavender: '#D5D8FC',
      stone: '#FFFCFA'
    },
  });

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Router />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
