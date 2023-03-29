import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpProvider } from '../contexts/SignUpContext';
import SelectDateScreen from '../screens/auth/SelectDateScreen';
import SelectOneScreen from '../screens/auth/SelectOneScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SingleQuestionScreen from '../screens/auth/SingleQuestionScreen';
import TransitionScreen from '../screens/auth/TransitionScreen';

const Stack = createNativeStackNavigator();

const SignUpStack = () => {
  return (
    <SignUpProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
        <Stack.Screen
          name="Single Question Screen"
          component={SingleQuestionScreen}
        />
        <Stack.Screen name="Transition Screen" component={TransitionScreen} />
        <Stack.Screen name="Select One Screen" component={SelectOneScreen} />
        <Stack.Screen name="Select Date Screen" component={SelectDateScreen} />
      </Stack.Navigator>
    </SignUpProvider>
  );
};

export default SignUpStack;
