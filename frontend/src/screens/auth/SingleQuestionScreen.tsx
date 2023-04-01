import { SafeAreaView, Text } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import { useSignUp } from "../../contexts/SignUpContext";

const SingleQuestionScreen = ({ navigation }) => {

  const signUpHook = useSignUp();
 // const page = signUpHook.page;
  const signUpFlow = signUpHook.signUpFlow;
  const state = signUpHook.signUpState;

  const back = async () => {
    const page = signUpHook.page;
    const prevPage = signUpHook.signUpFlow[page - 1];
    signUpHook.setPage(page - 1);
    navigation.navigate(prevPage.page);
  };

  const skip = async () => {
    const page = signUpHook.page;
    const nextPage = signUpHook.signUpFlow[page + 1];
    signUpHook.setPage(page + 1);
    navigation.navigate(nextPage.page);
  };


  return (
    <SafeAreaView>
      <ProgressBar
        progress={20}
        hasSkip={true}
        hasProgress={true}
        backFunction={back}
        skipFunction={skip}></ProgressBar>
      <Text>Single Question SCREEN</Text>
    </SafeAreaView>
  );
};

export default SingleQuestionScreen;
