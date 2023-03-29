import React from 'react';
import { Text, View } from 'native-base';
import ScreenWideButton from './ScreenWideButton';

type Answer = {
    id: number,
    text: string
  }

type SelectOneProps = {
    title: string,
    answers: Answer[]
    onAnswerPress: (answerId: number) => void
}

const SelectOne = (props : SelectOneProps) => {
    return (
        <View>
            <Text
                position="absolute"
                width="196px"
                height="58px"
                left="32px"
                top="153px"
                font-family="body"
                fontStyle="normal"
                fontWeight="700"
                fontSize="24px"
                lineHeight="29px"
            >
                {props.title}
            </Text>
            {props.answers.map((o : Answer) => (
                <ScreenWideButton 
                    text={o.text} 
                    pressed={false} 
                    onPress={() => props.onAnswerPress(o.id)}
                />))}
        </View>
    );
}

export default SelectOne;