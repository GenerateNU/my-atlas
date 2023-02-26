import { SafeAreaView, Text } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Question from '../../components/Question';
import { useSignUp } from '../../contexts/SignUpContext';

const SelectDateScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    //navigation.navigate(prevPage.page, { props: prevPage.props });
    navigation.pop();
  };

  const skip = async () => {
    const nextPage = signUpFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
      <ProgressBar
        progress={props.progress}
        hasSkip={true}
        hasProgress={true}
        backFunction={back}
        skipFunction={skip}></ProgressBar>
      <Text>Select Date SCREEN</Text>
      <Question question={props.question}></Question>
    </SafeAreaView>
  );
};

export default SelectDateScreen;