import React, { useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import Question from '../../components/Question';
import { Progress } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';
import DatePickers from '../../components/DatePicker';
const HomeScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signOut = async () => {
    isLoading(true);
    await auth.signOut();
  };

  const alert = () => {
    Alert.alert('You tapped a button!');
  }

  return (
    <SafeAreaView style={{backgroundColor: '#FFF9F1' }}>
      <ProgressBar
        progress={20}
        hasSkip={true}
        hasProgress={true}
        backFunction={alert}
        skipFunction={alert}></ProgressBar>
    <Question question={
          'What\'s your date of birth?'
        }>

    </Question>
      <DatePickers
        question={
          'Have you sought behavioral health or wellness care in the past?'
        }></DatePickers>
    </SafeAreaView>
  );
};

export default HomeScreen;
