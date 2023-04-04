import React from 'react';
import { Text, View } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Option = {
  id: number;
  text: string;
};

type big5ButtonProps = {
  title: string;
  options: Option[];
  pressed: boolean;
  onAnswerPress: (answerId: number) => void;
};

const Big5Button = (props: big5ButtonProps) => {
  return (
    <View>
      <Text
        font-family="body"
        fontStyle="normal"
        fontWeight="600"
        fontSize="xl"
        mx={wp('5%')}>
        {props.title}
      </Text>
    </View>
  );
};

export default Big5Button;
