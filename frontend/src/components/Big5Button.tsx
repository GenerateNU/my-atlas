import React, { Fragment } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, View } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Center, Square, Circle } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';

type big5ButtonProps = {
  number: number;
  buttonText: string;
  pressed: boolean;
  onAnswerPress: (answerId: number) => void;
};

const Big5Button = (props: big5ButtonProps) => {
  return (
    <View>
      <Center>
        <Button
          width={wp('10%')}
          height={wp('10%')}
          borderRadius={wp('10%')}
          _text={{ color: 'navy', fontSize: 'xl' }}
          mb="2"
          background={'gainsboro'}
          _pressed={{
            backgroundColor: 'navy',
          }}>
          {props.number}
        </Button>
        <Text fontSize="sm" color={'navy'}>
          {props.buttonText}
        </Text>
      </Center>
    </View>
  );
};

export default Big5Button;
