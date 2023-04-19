import React, { useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import Question from '../../components/Question';
import ProfileHeader from '../../components/home/ProfileHeader';
import Big5Redirect from '../../components/home/Big5Redirect';

const HomeScreen = ({navigation, route}) => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signOut = async () => {
    isLoading(true);
    await auth.signOut();
  };


  const big5Redirect = () => {
    // navigation.push('Big 5 Stack', { screen: 'Big 5 Intro Screen' });
    navigation.push('Big 5 Results Screen');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFCFA' }}>
      <ProfileHeader userName={auth.authData.user.name} onPress={signOut}/>
      <Big5Redirect onPress={big5Redirect} titleText={"Big 5 Personality Test"} subtitleText={"Quiz to measure 5 Personality Traits"}/>
    </SafeAreaView>
  );
};

export default HomeScreen;
