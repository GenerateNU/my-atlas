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
  }, [loading])

  return (
    <SafeAreaView>
      <Text>ACCESS SCREEN</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <Button title="Sign In" onPress={signIn} />
      )}
    </SafeAreaView>
  );
};

export default AccessScreen;
