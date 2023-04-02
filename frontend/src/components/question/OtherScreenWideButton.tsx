import React, {useState} from 'react';
import { Button, Input } from 'native-base';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

type OtherScreenWideButtonProps = {
    onPress: () => void;
}

const OtherScreenWideButton = (props : OtherScreenWideButtonProps) => {

    const [text, setText] = useState('');

    return (
        <Input
            size="xl"
            placeholder='Other'
            variant="outline"
            mx={wp("5%")}
            placeholderTextColor={"navy"}
            backgroundColor={"cream"}
            borderRadius="10px"
            borderColor={'lightOrange'}
            value={text}
            onChangeText={(value) => setText(value)}
        />
    );
}

export default OtherScreenWideButton;