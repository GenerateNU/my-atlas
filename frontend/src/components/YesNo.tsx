import React, { Fragment, ReactNode } from 'react';
import { Box, Text, Center, Progress, VStack, View, Pressable } from 'native-base';
import { Alert, Button, GestureResponderEvent,StyleSheet,TextStyle,ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type YesNoProps = {
  yesFunction: any;
  noFunction: any;
};

const YesNo = (props: YesNoProps) => {
  function onPressYes(event: GestureResponderEvent): void {
    props.yesFunction();
  }

  function onPressNo(event: GestureResponderEvent): void {
    props.noFunction();
  }

  return (
    <Center w="100%" paddingBottom={hp('1%')}>
      <Box w="90%" maxW="400">
        <VStack>
          <VStack mx="4" space="lg">
            <Text style={styles.text} color={'navy'} fontSize={22} textAlign="left" paddingRight={20}>
              Have you sought behavioral health or wellness care in the past?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Pressable style={styles.button} onPress={onPressYes}>
                <Text style={styles.text} fontSize={16}>
                  {'Yes'}
                </Text>
              </Pressable>
              <Pressable style={styles.button} onPress={onPressNo}>
                <Text style={styles.text} fontSize={16}>
                  {'No'}
                </Text>
              </Pressable>
            </View>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(241, 195, 169, 1)',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: "500",
    lineHeight: 23,
    letterSpacing: 0.6,
    color: 'navy',
  },
});

export default YesNo;
