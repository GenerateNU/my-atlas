import React from 'react';
import { Button, Text } from 'native-base';

type ScreenWideButtonProps = {
    text: string,
    pressed: boolean,
    onPress: () => void
}

const ScreenWideButton = (props : ScreenWideButtonProps) => {

    let bgColor = "#F1C3A9"
    let fontColor = "#271E41"
    if (props.pressed) {
        bgColor = "#C55415"
        fontColor = "#FFFFFF"
    }

    return (
        <Button 
            onPress={props.onPress}
            position="absolute"
            left="0%"
            right="0%"
            top="0%"
            bottom="0%"
            background={bgColor}
            borderRadius="10px"
        >
            <Text 
                position="absolute"
                left="6.77%"
                right="6.46%"
                top="22%"
                bottom="24%"
                fontFamily="body"
                fontStyle="normal"
                fontWeight="600"
                fontSize="20px"
                lineHeight="33px"
                display="flex"
                alignItems="center"
                color={fontColor}
            >
                {props.text}
            </Text>
        </Button>
    );
}

export default ScreenWideButton;