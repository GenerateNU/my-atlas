import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useSignUp } from '../../contexts/SignUpContext';
import Big5Start from '../../components/Big5Start';

const Big5StartScreen = ({route, navigation}) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <ProgressBar
        progress={20}
        hasSkip={false}
        hasProgress={false}
        backFunction={back}
        skipFunction={skip}></ProgressBar>
      <Big5Start startFunction={skip}></Big5Start>
    </SafeAreaView>
  );
};

export default Big5StartScreen;
