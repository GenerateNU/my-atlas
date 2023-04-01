import { Container, Heading } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View, Image, _Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Progress } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AtlasLogo } from '../../img';
import ProgressBar from '../../components/ProgressBar';
import { useSignUp } from '../../contexts/SignUpContext';

const AccessScreen = ({ navigation }) => {
  const [loading, isLoading] = useState(false);


  const signUp = async () => {
    isLoading(true);
    navigation.navigate('Sign Up Stack', { screen: 'Single Question Screen' });
  };

  const signIn = async () => {
    isLoading(true);
    navigation.navigate('Sign In Screen');
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <Heading size="3xl" marginTop={hp('12%')} marginBottom={hp('7%')}>
          My Atlas
        </Heading>
        <Image source={AtlasLogo} />
        <Button
          _text={{
            fontSize: 'xl',
            color: 'navy',
            fontWeight: 'semibold',
            letterSpacing: 'lg',
          }}
          _pressed={{
            backgroundColor: 'darkOrange',
            _text: { color: 'white' },
          }}
          onPress={signUp}
          w={wp('75%')}
          bg={'lightOrange'}
          borderRadius="md"
          marginTop={hp('18%')}>
          Create Account
        </Button>
        <Button
          _text={{
            fontSize: 'xl',
            color: 'navy',
            fontWeight: 'semibold',
            letterSpacing: 'lg',
          }}
          onPress={signIn}
          variant={'unstyled'}>
          Sign in
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default AccessScreen;
