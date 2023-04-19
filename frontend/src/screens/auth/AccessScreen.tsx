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
import { useSignUp } from '../../contexts/SignUpContext';

const AccessScreen = ({ route, navigation }) => {
  const [loading, isLoading] = useState(false);

  const signUp = async () => {
    isLoading(true);
    navigation.push('Sign Up Stack', { screen: 'Sign Up Screen' });
  };

  const signIn = async () => {
    isLoading(true);
    navigation.navigate('Sign In Screen');
  };

  useEffect(() => {
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <Heading size="3xl" marginTop={hp('12%')} marginBottom={hp('7%')}>
          My Atlas
        </Heading>
        <Image source={AtlasLogo} />
        <Button
          _text={{
            fontSize: 'xl',
            color: 'midnight',
            fontWeight: 'semibold',
            letterSpacing: 'lg',
          }}
          _pressed={{
            backgroundColor: 'terra',
            _text: { color: 'white' },
          }}
          onPress={signUp}
          w={wp('75%')}
          bg={'nectarine'}
          borderRadius="md"
          marginTop={hp('18%')}>
          Create Account
        </Button>
        <Button
          _text={{
            fontSize: 'xl',
            color: 'midnight',
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
