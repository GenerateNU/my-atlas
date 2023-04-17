import { KeyboardAvoidingView, ScrollView } from 'native-base';
import { Fragment } from 'react';
import { Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Question from '../../components/Question';
import SelectOne from '../../components/question/SelectOne';
import { useSignUp } from '../../contexts/SignUpContext';

const SelectOneScreen = ({ route, navigation }) => {
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
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  const handlePress = () => {
    console.log('Button pressed!');
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
        <KeyboardAvoidingView behavior="height">
          <ScrollView keyboardShouldPersistTaps="never">
            <View onStartShouldSetResponder={() => true}>
              <Question question={'Which best describes you?'}>
                {props.sections.map((selectOne, key) => (
                  <SelectOne
                    key={key}
                    title={selectOne.title}
                    onAnswerPress={handleChange}
                    options={selectOne.answers}
                    other={selectOne.other}
                    stateName={selectOne.stateName}
                    state={signUpState[selectOne.stateName]}
                  />
                ))}

                {/* <SelectOne
                title="Gender Identity"
                options={[
                  { id: 1, text: 'Woman' },
                  { id: 2, text: 'Man' },
                  { id: 3, text: 'Transgender woman' },
                  { id: 4, text: 'Transgender man' },
                  { id: 5, text: 'Non-binary' },
                  { id: 6, text: 'Prefer not to say' },
                ]}
                other={false}
                onAnswerPress={handlePress}
              /> */}
              </Question>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SelectOneScreen;
