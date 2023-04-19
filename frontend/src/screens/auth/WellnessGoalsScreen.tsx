import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import {Text, View} from 'native-base'
import ProgressBar from '../../components/ProgressBar';
import { Alert } from 'react-native';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';
import { Container } from 'native-base';
import Question from '../../components/Question';
import SelectMultipleButtons from '../../components/SelectMultiple'
import ScreenWideInput from '../../components/ScreenWideInput';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Fragment, ReactNode } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WellnessGoalsScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange, handleChangeArray } = useSignUp();

  const styles = StyleSheet.create({
    // button: {
    //   paddingVertical: 12,
    //   paddingHorizontal: 40,
    //   borderRadius: 10,
    //   backgroundColor: 'rgba(241, 195, 169, 1)',
    //   shadowColor: '#52006A',
    // },
    text: {
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: hp('3.2%'),
      letterSpacing: wp('0.23%'),
      color: '#271E41',
    //   fontSize: 18,
      marginLeft: wp('8%'),
      marginRight: wp('20%'),
      marginTop: wp('5%'),
      marginBottom: wp('3%'),
      fontSize: hp('3%'),
    //   lineHeight:hp('3.2%'),
    //   letterSpacing:wp('0.23%')
    //   margin: 20
    },
    // buttonClicked: {
    //   paddingVertical: 12,
    //   paddingHorizontal: 40,
    //   borderRadius: 10,
    //   backgroundColor: 'rgba(197, 84, 21, 1);',
    // },
    // textClicked: {
    //   fontStyle: 'normal',
    //   fontWeight: '500',
    //   lineHeight: 23,
    //   letterSpacing: 0.6,
    //   color: 'white',
    //   fontSize: 20,
    // },
  });

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

  const yesFunction = async () => {
    handleChange(props.stateName, true);

    // Alert.alert('yes function');
  };

  const noFunction = async () => {
    handleChange(props.stateName, false);
    // Alert.alert('no function');
  };

const wellnessGoals = [
  'Anxiety',
  'Improving Mood',
  'Mindfulness',
  'Practicing Gratitude',
  'Self-love',
  'Self-worth',
  'Setting boundaries',
  'Sleep',
  'Stress',
];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <ProgressBar
          progress={props.progress}
          hasSkip={false}
          hasProgress={true}
          backFunction={back}
          skipFunction={skip}></ProgressBar>
        <KeyboardAvoidingView behavior="height" height={'100%'} w={'full'} maxWidth="100%">
          <ScrollView
            keyboardShouldPersistTaps="never"
            contentContainerStyle={{ flexGrow: 1 }}
            width={'100%'}>
            <Question question={'Choose your behavioral health and wellness goals'}>
              <View>
                <Text marginLeft={wp('8%')}>Select all that apply</Text>
              </View>

              <SelectMultipleButtons
                              state={signUpState[props.stateName]}
                              handleChange={handleChangeArray}
                              listOfButtonNames={wellnessGoals}
                              subtitle={null}
                              stateName={props.stateName}              />
            </Question>

            <NextButton
              iconColor="#C55415"
              bgColor="#F1C3A9"
              pressedBgColor="#C55415"
              pressedIconColor="#FFFFFF"
              onPress={skip}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
};


export default WellnessGoalsScreen;
