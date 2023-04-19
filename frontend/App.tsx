import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Router from './src/navigation/Router';
import ScreenWideButton from './src/components/question/ScreenWideButton';
import { setupPermissions } from './src/services/healthServices/healthKitService';



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
   setupPermissions();
  // colors used in our app
  const theme = extendTheme({
    colors: {
      midnight: '#271E41',
      miniPeach: '#FAF4F0',
      cream: '#E5E5E5',
      nectarine: '#F1C3A9',
      darkOrange: '#C55415',
      gray: '#666666',
      lilac: '#F5F6FF',
      lightPurple: '#E8EAF6',
      lavender: '#D5D8FC',
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