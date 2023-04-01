import { Button, Container, Heading, Input } from 'native-base';
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

const SignUpScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <Heading size="3xl" marginTop={hp('5%')} marginBottom={hp('5%')} marginX={wp('10%')}>
            Welcome to My Atlas
          </Heading>
          <Input></Input>
          <Input></Input>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
