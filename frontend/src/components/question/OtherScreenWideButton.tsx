import React from 'react';
import { Button, Text } from 'native-base';

type OtherScreenWideButtonProps = {
    onPress: () => void;
}

const OtherScreenWideButton = (props : OtherScreenWideButtonProps) => {
    return (
        <Button 
            onPress={props.onPress}
            position="absolute"
            left="0%"
            right="0%"
            top="0%"
            bottom="0%"
            background="#F1C3A9"
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
                color="#271E41"
            >
                Other
            </Text>
        </Button>
    );
}

export default OtherScreenWideButton;