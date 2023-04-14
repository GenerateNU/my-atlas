import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Big5Provider } from '../contexts/Big5Context';
import Big5IntroScreen from '../screens/app/Big5IntroScreen';

const Stack = createNativeStackNavigator();

const Big5Stack = () => {
  return (
    <Big5Provider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
            <Stack.Screen name="Big 5 Intro Screen" component={Big5IntroScreen} />
        </Stack.Navigator>
    </Big5Provider>
  );
};

export default Big5Stack;
