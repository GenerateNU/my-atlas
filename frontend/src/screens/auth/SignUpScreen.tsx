import { Button, Container, Heading, Input } from 'native-base';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgressBar from '../../components/ProgressBar';
import ScreenWideInput from '../../components/ScreenWideInput';
import { useSignUp } from '../../contexts/SignUpContext';

const SignUpScreen = ({route, navigation}) => {
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

    const back = async () => {
      const prevPage = signUpFlow[page - 1];
      setPage(page - 1);
      navigation.navigate("Access Screen");
    };

    const skip = async () => {
      const nextPage = signUpFlow[page + 1];
      setPage(page + 1);
      navigation.push(nextPage.page, {props: nextPage.props});
    };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <ProgressBar backFunction={back} hasProgress={false} hasSkip={true} skipFunction={skip}/>
          <Heading size="3xl" marginTop={hp('5%')} marginBottom={hp('4%')} marginX={wp('10%')}>
            Welcome to My Atlas
          </Heading>
          <ScreenWideInput
            name="email"
            onChangeText={handleChange}
            placeholderText="Email"
            text={signUpState.user.email}
          />
          <ScreenWideInput
            name="password"
            onChangeText={handleChange}
            placeholderText="Password"
            text={signUpState.user.password}
          />
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
