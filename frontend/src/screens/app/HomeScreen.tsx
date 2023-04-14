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

  const formData = [
    { title: 'I am the life of the party' },
    { title: 'I am very good at identifying the emotions I am feeling' },
    { title: 'I am very good at reading body language.' },
    { title: 'There are many things that I do not like about myself.' },
  ];

  return (
    <SafeAreaView>
      {formData.map((formData, key) => (
        <Big5Form title={formData.title} />
      ))}
    </SafeAreaView>
  );
};

export default HomeScreen;
