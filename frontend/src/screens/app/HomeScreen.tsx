import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../../components/Question';
import Big5Button from '../../components/Big5Button';
import { useAuth } from '../../contexts/Auth';

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
      <Big5Button
        title="I am the life of the party"
        options={[
          { id: 1, text: 'Disagree' },
          { id: 2, text: 'Slightly Disagree' },
          { id: 3, text: 'Neutral' },
          { id: 4, text: 'Slightly Agree' },
          { id: 5, text: 'Agree' },
        ]}
        pressed={false}
        onAnswerPress={handlePress}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
