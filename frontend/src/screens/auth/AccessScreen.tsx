import { Container } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/Auth';

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
    <SafeAreaView style={{ flex:1, backgroundColor: '#F1C3A9' }}>
      <Container bgColor={'lighterPurple'} h={"full"} w={"full"} maxWidth="100%" maxHeight="100%">
        <Text>ACCESS SCREEN</Text>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <Button title="Sign In" onPress={signIn} />
        )}
      </Container>
    </SafeAreaView>
  );
};

export default AccessScreen;
