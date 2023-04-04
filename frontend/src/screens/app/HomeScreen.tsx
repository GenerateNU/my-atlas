import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/Auth';
import ScreenWideButton from '../../components/question/ScreenWideButton';
import SelectOne from '../../components/question/SelectOne';
import OtherScreenWideButton from '../../components/question/OtherScreenWideButton';

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
      {/* /** <Text>HOME SCREEN</Text>
      <Button title="Sign Out" onPress={signOut} />
      {auth.authData ? (
        <Text>{auth.authData.user.name}</Text>
      ) : (
        <Text>Not loaded</Text>
        
      )} */}
      <SelectOne 
        title="Sex assigned at birth" 
        options={[{id: 1, text: "female"}, {id: 2, text:"male"}]} 
        other={true} 
        onAnswerPress={handlePress}/>
    </SafeAreaView>
  );
};

export default HomeScreen;
