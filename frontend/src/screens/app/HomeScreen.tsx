import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../../components/Question';
import Big5Button from '../../components/Big5Button';
import { useAuth } from '../../contexts/Auth';
import Big5Form from '../../components/Big5Form';

const HomeScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signOut = async () => {
    isLoading(true);
    await auth.signOut();
  };
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <SafeAreaView>
      {<Big5Form title="I am the life of the party" />}

      {/* <Big5Button
        number={1}
        buttonText={'Disagree'}
        pressed={true}
        onAnswerPress={handlePress}
      /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
