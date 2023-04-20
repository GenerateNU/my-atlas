import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import Question from '../../components/Question';
import { addMany } from '../../services/healthServices/healthServices';
import { getUser } from '../../services/userService';
import { addHealthLocally } from '../../services/healthServices/healthServices';
import { getLocalData } from '../../services/healthServices/healthServices';

const HomeScreen = ({navigation, route}) => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const userID  = auth.authData.user._id;
  const token = auth.authData.token;

  const signOut = async () => {
    isLoading(true);
    await auth.signOut();
  };


  const redirect = () => {
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

  return (
    <SafeAreaView>
      <Text>HOME SCREEN</Text>
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Click Me" onPress={redirect}/>
      <Button title="Stuff" onPress={doStuff}/>
      <Button title="Add Local" onPress={addDataLocally}/>
      <Button title="Get Local" onPress={getUserStuff}/>
      {auth.authData ? (
        <Text>{auth.authData.user.name}</Text>
      ) : (
        <Text>Not loaded</Text>

      )}
      <Question question={"Which best describes you?"}>
      </Question>
    </SafeAreaView>
  );
};

export default HomeScreen;
