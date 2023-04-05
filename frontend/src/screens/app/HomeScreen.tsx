import React, { useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import ScreenWideButton from '../../components/question/ScreenWideButton';
import SelectOne from '../../components/question/SelectOne';
import OtherScreenWideButton from '../../components/question/OtherScreenWideButton';
import Question from '../../components/Question';

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

  const alert = () => {
    Alert.alert('You tapped a button!');
  }

  return (
    <SafeAreaView>
      {/* /** <Text>HOME SCREEN</Text>
      <Button title="Sign Out" onPress={signOut} />
      {auth.authData ? (
        <Text>{auth.authData.user.name}</Text>
      ) : (
        <Text>Not loaded</Text>
        
      )} */}
      <Question question={"Which best describes you?"}>
        <SelectOne 
          title="Sex assigned at birth" 
          options={[{id: 1, text: "female"}, {id: 2, text:"male"}]} 
          other={true}
          onAnswerPress={handlePress}
        />
        <SelectOne 
          title="Gender Identity" 
          options={[{id: 1, text: "Woman"}, 
                    {id: 2, text:"Man"},
                    {id: 3, text:"Transgender woman"},
                    {id: 4, text:"Transgender man"},
                    {id: 5, text:"Non-binary"},
                    {id: 6, text:"Prefer not to say"},]} 
          other={false} 
          onAnswerPress={handlePress}
        />
      </Question>
    </SafeAreaView>
  );
};

export default HomeScreen;
