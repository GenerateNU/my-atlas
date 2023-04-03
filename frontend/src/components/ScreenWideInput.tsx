import React, { useState } from 'react';
import { Input } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ScreenWideInputProps = {
  text: string;
  name: string;
  onChangeText: (name, value) => void;
  placeholderText: string;
  marginBottom?: string;
};

const ScreenWideInput = (props: ScreenWideInputProps) => {
  const [text, setText] = useState('');

  return (
    <Input
      size="xl"
      py={hp('1.25%')}
      paddingLeft={wp('5%')}
      marginBottom={props.marginBottom ? wp(props.marginBottom) : wp('5%)')}
      placeholder={props.placeholderText}
      variant="outline"
      mx={wp('5%')}
      placeholderTextColor={'navy'}
      borderRadius="10px"
      borderColor={'lightOrange'}
      value={props.text}
      onChangeText={value => props.onChangeText(props.name, value)}
    />
  );
};

export default ScreenWideInput;
