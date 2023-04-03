import { SafeAreaView, Text } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useSignUp } from '../../contexts/SignUpContext';

const SelectDateScreen = ({navigation}) => {
    const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

    const back = async () => {
      const prevPage = signUpFlow[page - 1];
      setPage(page - 1);
      navigation.navigate(prevPage.page);
    };

    const skip = async () => {
      const nextPage = signUpFlow[page + 1];
      setPage(page + 1);
      navigation.push(nextPage.page);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
      <ProgressBar
        progress={20}
        hasSkip={true}
        hasProgress={true}
        backFunction={back}
        skipFunction={skip}></ProgressBar>
      <Text>Select Date SCREEN</Text>
    </SafeAreaView>
  );
};

export default SelectDateScreen;
