import React from 'react';
import { Text, View } from 'native-base';
import ScreenWideButton from './ScreenWideButton';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import OtherScreenWideButton from './OtherScreenWideButton';

type Option = {
    id: number,
    text: string
  }

type SelectOneProps = {
    title: string,
    options: Option[]
    other: boolean
    onAnswerPress: (answerId: number) => void
}

const SelectOne = (props : SelectOneProps) => {

    return (
        <View>
            <Text
                font-family="body"
                fontStyle="normal"
                fontWeight="600"
                fontSize='xl'
                mx={wp("5%")}
                underline={true}
            >
                {props.title}
            </Text>
            {props.options.map((o : Option) => (
                <ScreenWideButton
                    key={o.id} 
                    text={o.text}
                    onPress={() => props.onAnswerPress(o.id)}
                />))}
            {props.other? <OtherScreenWideButton onPress={() => props.onAnswerPress(props.options.length + 1)}/> : null}
        </View>
    );
}

export default SelectOne;