import { SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar";

const OnboardingScreen = () => {
    return (
      <SafeAreaView>
        <ProgressBar
          progress={20}
          hasSkip={true}
          hasProgress={true}
          backFunction={alert}
          skipFunction={alert}></ProgressBar>
        <Text>Onboarding SCREEN</Text>
      </SafeAreaView>
    );
}

export default OnboardingScreen;