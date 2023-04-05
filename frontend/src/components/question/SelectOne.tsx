import React, { Fragment } from 'react';
import { Text, View } from 'native-base';
import ScreenWideButton from './ScreenWideButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenWideInput from '../ScreenWideInput';

type Option = {
  id: number;
  text: string;
};

type SelectOneProps = {
  title?: string;
  options: string[];
  other: boolean;
  onAnswerPress: (answerId: number) => void;
};

const SelectOne = (props: SelectOneProps) => {
  return (
    <View marginBottom={hp("2%")}>
      {props.title ? (
        <Text
          font-family="body"
          fontStyle="normal"
          fontWeight="600"
          fontSize="xl"
          ml={wp('8%')}
          underline={true}>
          {props.title}
        </Text>
      ) : (
        <Fragment></Fragment>
      )}

      {props.options.map((option, key) => (
        <ScreenWideButton key={key} text={option} onPress={() => props.onAnswerPress(key)} />
      ))}
      {props.other ? (
        <ScreenWideInput
          name="title"
          text=""
          placeholderText="Other"
          onChangeText={(name, value) => props.onAnswerPress(props.options.length + 1)}
        />
      ) : null}
    </View>
  );
};

export default SelectOne;
