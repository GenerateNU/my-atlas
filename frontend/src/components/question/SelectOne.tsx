import React, { Fragment } from 'react';
import { Text, View } from 'native-base';
import ScreenWideButton from './ScreenWideButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenWideInput from '../ScreenWideInput';

type SelectOneProps = {
  title?: string;
  options: string[];
  other: boolean;
  onAnswerPress: (name: string, value: any) => void;
  stateName: string,
  state: any
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
        <ScreenWideButton key={key} text={option} state={props.state} onPress={() => props.onAnswerPress(props.stateName, option)} />
      ))}
      {props.other ? (
        <ScreenWideInput
          name="title"
          text=""
          placeholderText="Other"
          onChangeText={(name, value) => console.log()}
        />
      ) : null}
    </View>
  );
};

export default SelectOne;
