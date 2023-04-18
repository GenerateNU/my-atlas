import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Router from './src/navigation/Router';
import ScreenWideButton from './src/components/question/ScreenWideButton';
import { setupPermissions } from './src/services/healthServices/healthService';

setupPermissions();

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
      navy: '#271E41',
      offWhite: '#FFF9F1',
      cream: '#E5E5E5',
      lightOrange: '#F1C3A9',
      darkOrange: '#C55415',
      gray: '#666666',
      lighterPurple: '#F5F6FF',
      lightPurple: '#E8EAF6',
    },
  });

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Router/>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </AuthProvider>
    // <View style={styles.container}>
    //   <Text>Hi, this is My Atlas, welcome.</Text>
    //   <Text>Steps: {steps} </Text>
    //   <StatusBar style="auto" />
    // </View>
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