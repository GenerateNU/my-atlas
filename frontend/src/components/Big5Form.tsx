import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Center, Text, View, keyboardDismissHandlerManager } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Big5Button from './Big5Button';
import { HStack } from 'native-base';

type big5FormProps = {
  title: string;
  // onAnswerPress: (answerId: number) => void;
};

const handlePress = () => {
  console.log('Button pressed!');
};

const Big5Form = (props: big5FormProps) => {
  const buttonData = [
    { number: 1, buttonText: 'Disagree' },
    { number: 2, buttonText: '' },
    { number: 3, buttonText: 'Neutral ' },
    { number: 4, buttonText: '' },
    { number: 5, buttonText: 'Agree ' },
  ];

  return (
    <View>
      <Text
        font-family="body"
        fontStyle="normal"
        fontWeight="600"
        fontSize="2xl"
        mx={wp('5%')}
        py="5"
        color="#271E41">
        {props.title}
      </Text>

      <View>
        <HStack style={{ justifyContent: 'space-evenly' }}>
          {buttonData.map((buttonData, key) => (
            <Big5Button
              key={key}
              number={buttonData.number}
              buttonText={buttonData.buttonText}
              pressed={false}
              onAnswerPress={handlePress}
            />
          ))}
        </HStack>
      </View>
    </View>
  );
};

export default Big5Form;
