import { Container, Heading } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AccessScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    try {
      await auth.signIn();
    } catch (error) {
      isLoading(false);
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
      <Container
        h={'full'}
        w={'full'}
        maxWidth="100%"
        maxHeight="100%"
        alignItems={'center'}>
        <Heading size="3xl" marginTop={hp('20%')}>
          My Atlas
        </Heading>
        <Pressable onPress={signIn} size={wp("20%")} color={"lightOrange"}> Sign in</Pressable>
      </Container>
    </SafeAreaView>
  );
};

export default AccessScreen;
