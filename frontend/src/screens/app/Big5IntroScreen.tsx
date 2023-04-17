import { Container } from 'native-base';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

const Big5IntroScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FF' }}>
        <Container
          h={'full'}
          w={'full'}
          maxWidth="100%"
          maxHeight="100%"
          alignItems={'center'}></Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Big5IntroScreen;
