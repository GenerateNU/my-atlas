import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { Alert } from 'react-native';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';
import { Container } from 'native-base';
import Question from '../../components/Question';
import SelectMultipleButtons from '../../components/SelectMultiple';
import ScreenWideInput from '../../components/ScreenWideInput';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Fragment, ReactNode } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ExperienceScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

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
    //   letterSpacing: wp('0.23%'),
      color: '#271E41',
      //   fontSize: 18,
      marginLeft: wp('8%'),
        marginRight: wp('20%'),
        marginTop: wp('5%'),
        marginBottom: wp('3%'),
    //   fontSize: hp('3%'),

      // // fontWeight="semibold"
      // lineHeight={hp('3.2%')}
      // letterSpacing={wp('0.23%')}
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

const substanceAbuse = [
  { key: '1', title: 'Alcohol misuse' },
  { key: '2', title: 'Drug misuse' },
  { key: '3', title: 'Smoking or tobacco misuse' },
];
const moodAndEmotions = [
  { key: '1', title: 'Anger' },
  { key: '2', title: 'Anxiety' },
  { key: '3', title: 'Irritability' },
  { key: '4', title: 'Low motivation' },
  { key: '5', title: 'Mood swings' },
  { key: '6', title: 'Panic or anxiety attacks' },
  { key: '7', title: 'Pessimism' },
  { key: '8', title: 'Sadness' },
  { key: '9', title: 'Suicidal thoughts' },
];
const behavioralIssues = [
  { key: '1', title: 'Compulsions' },
  { key: '2', title: 'Gambling' },
  { key: '3', title: 'Procrastination' },
  { key: '4', title: 'Unstable relationship with food' },
];

const interpersonalConflicts = [
  { key: '1', title: 'Career conerns' },
  { key: '2', title: 'Friendship instability' },
  { key: '3', title: 'Guilt' },
  { key: '4', title: 'Interpersonal conflicts' },
  { key: '5', title: 'Loneliness' },
  { key: '6', title: 'Work trouble' },
];
const cognitiveMentalHealth = [
  { key: '1', title: 'Delusions' },
  { key: '2', title: 'Distractibility' },
  { key: '3', title: 'Fatigue' },
  { key: '4', title: 'Fears/phobias' },
  { key: '5', title: 'Impulsivenss' },
  { key: '6', title: 'Perfectionism' },
  { key: '7', title: 'Poor judgement' },
  { key: '8', title: 'Self-esteem issues' },
  { key: '9', title: 'Trouble sleeping' },
  { key: '10', title: 'Memory issues' },
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
            <Question question={'Do you experience any of the following?'}>
              <Text style={styles.text}>Select all that apply</Text>

              <SelectMultipleButtons listOfButtonNames={substanceAbuse} subtitle={null} />
              <SelectMultipleButtons listOfButtonNames={moodAndEmotions} subtitle={null} />
              <SelectMultipleButtons listOfButtonNames={behavioralIssues} subtitle={null} />
              <SelectMultipleButtons listOfButtonNames={interpersonalConflicts} subtitle={null} />
              <SelectMultipleButtons listOfButtonNames={cognitiveMentalHealth} subtitle={null} />
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

export default ExperienceScreen;
