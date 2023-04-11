import { SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar";
import YesNo from "../../components/YesNo";
import { Alert } from 'react-native';
import { useSignUp } from "../../contexts/SignUpContext";

const YesNoScreen = ({route, navigation}) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    // navigation.navigate(prevPage.page, {props: prevPage.props});
    navigation.pop();
  };

  const skip = async () => {
    const nextPage = signUpFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props});
  };

  const yesFunction = async () => {
    handleChange(props.stateName, true);

    // Alert.alert('yes function');
  };

  const noFunction = async () => {
    handleChange(props.stateName, false);
    // Alert.alert('no function');
  };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
        <ProgressBar
          progress={20}
          hasSkip={true}
          hasProgress={true}
          backFunction={back}
          skipFunction={skip}></ProgressBar>
        <YesNo question={props.question} yesFunction={yesFunction} noFunction={noFunction} clicked={signUpState[props.stateName]}></YesNo>
      </SafeAreaView>
    );
}

export default YesNoScreen;