import React from 'react';
import { Button } from 'native-base';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

type ScreenWideButtonProps = {
    text: string,
    onPress: () => void
}

const ScreenWideButton = (props : ScreenWideButtonProps) => {

    return (
        <Button 
            onPress={props.onPress}
            borderRadius="10px"
            mx={wp("5%")}
            my={hp("1%")}
            _text={{
                fontSize: 'xl',
                fontWeight: 'semibold',
                color: "navy",
                letterSpacing: 'lg',
                textAlign: "left"
            }}
            _pressed={{
                backgroundColor:'darkOrange',
                _text: { color: 'white' }
            }}
            bg={'lightOrange'}>
            {props.text}
        </Button>
    );
}

export default ScreenWideButton;