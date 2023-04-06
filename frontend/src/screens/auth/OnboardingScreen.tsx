import { SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar";
import YesNo from "../../components/YesNo";
import { Alert } from 'react-native';

const OnboardingScreen = () => {
  const yesFunction = async () => {
    Alert.alert('yes function');
  };

  const noFunction = async () => {
    Alert.alert('no function');
  };

    return (
      <SafeAreaView>
        <ProgressBar
          progress={20}
          hasSkip={true}
          hasProgress={true}
          backFunction={alert}
          skipFunction={alert}></ProgressBar>
        <Text>Onboarding SCREEN</Text>
        <YesNo yesFunction={yesFunction} noFunction={noFunction}></YesNo>
      </SafeAreaView>
    );
}

export default OnboardingScreen;