import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import ProfileHeader from '../../components/home/ProfileHeader';
import Big5Redirect from '../../components/home/Big5Redirect';
import useAxios from 'axios-hooks';

const HomeScreen = ({ navigation, route }) => {
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
  };
  const userId = auth.authData.user._id;
  const token = auth.authData.token;

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:3000/api/onboarding/getPersonalityTestCompleted/' + userId,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const big5Redirect = () => {
    navigation.push('Big 5 Results Screen');
  };

  const big5TestRedirect = () => {
    navigation.push('Big 5 Stack', { screen: 'Big 5 Intro Screen' });
  };

  const pressableRetrieval = () => {
    return data ? (
      <Big5Redirect
        onPress={big5TestRedirect}
        titleText={'See Big 5 Personality Test Results'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    ) : (
      <Big5Redirect
        onPress={big5Redirect}
        titleText={'Complete Big 5 Personality Test'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFCFA' }}>
      <ProfileHeader userName={auth.authData.user.name} onPress={signOut} />
      {loading ? <></> : error ? <Text>Failed to get Onboarding Info</Text> : pressableRetrieval()}
    </SafeAreaView>
  );
};

export default HomeScreen;
