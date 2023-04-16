import { Container, KeyboardAvoidingView, ScrollView } from 'native-base';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import Big5Form from '../../components/Big5Form';
import ProgressBar from '../../components/ProgressBar';
import { useBig5 } from '../../contexts/Big5Context';

const Big5SelectionScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, big5State, setBig5State, big5Flow, handleChange } = useBig5();

  const back = async () => {
    const prevPage = big5Flow[page - 1];
    setPage(page - 1);
    navigation.pop();
  };

  const skip = async () => {
    const nextPage = big5Flow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
        <ProgressBar
          progress={props.progress}
          hasSkip={true}
          hasProgress={true}
          backFunction={back}
          skipFunction={skip}></ProgressBar>
        <KeyboardAvoidingView behavior="height" height={'100%'}>
          <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1 }}>
            <View onStartShouldSetResponder={() => true}>
            {props.questions.map((selectOne, key) => (
                  <Big5Form
                    key={key}
                    title={selectOne.title}
                  />
                ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Big5SelectionScreen;
