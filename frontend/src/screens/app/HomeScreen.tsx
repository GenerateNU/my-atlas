import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import Question from '../../components/Question';
import { addMany } from '../../services/healthServices/healthServices';
import { getUser } from '../../services/userService';
import { addHealthLocally } from '../../services/healthServices/healthServices';
import { getLocalData } from '../../services/healthServices/healthServices';
import ProfileHeader from '../../components/home/ProfileHeader';
import Big5Redirect from '../../components/home/Big5Redirect';
import useAxios from 'axios-hooks';
import ActivityStats from '../../components/home/ActivityStats';


const HomeScreen = ({navigation, route}) => {
  const auth = useAuth();
  const userID  = auth.authData.user._id;
  const token = auth.authData.token;
  const signOut = async () => {
    await auth.signOut();
  };

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:3000/api/onboarding/getPersonalityTestCompleted/' + userID,
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
  }
  
  const alert = () => {
    Alert.alert('You tapped a button!');
  }
  // useEffect(()=>{
    
  // }, [])

  function doStuff() {
   addMany(userID, token);
  }

  function getUserStuff(){
    try{
      getUser(token);
    }
    catch (error){
      console.log(error);
    }
   
  }

  function addDataLocally(){
    addHealthLocally(userID);
  }
  function getLocallyData(){
    getLocalData();
  }

  const pressableRetrieval = () => {
    return data ? (
      <Big5Redirect
        onPress={big5Redirect}
        titleText={'See Big 5 Personality Test Results'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    ) : (
      <Big5Redirect
        onPress={big5TestRedirect}
        titleText={'Complete Big 5 Personality Test'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFCFA' }}>
      <ProfileHeader userName={auth.authData.user.name} onPress={signOut} />
      {loading ? <></> : error ? <Text>Failed to get Onboarding Info</Text> : pressableRetrieval()}
      <Button title="Stuff" onPress={doStuff}/>
      <Button title="Add Local" onPress={addDataLocally}/>
      <Button title="Get Local" onPress={getUserStuff}/>
      <ActivityStats userID={userID} token={token} />
    </SafeAreaView>
  );
};

export default HomeScreen;
