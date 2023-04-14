import React, { Fragment, ReactNode } from 'react';
import { Box, Text, Center, Progress, VStack, View, Pressable, Heading } from 'native-base';
import {
  Alert,
  Button,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Question from './Question';
import { color } from 'native-base/lib/typescript/theme/styled-system';

type Big5StartProps = {
    startFunction: any;
};

const Big5Start = (props: Big5StartProps) => {
  function onPressStart(event: GestureResponderEvent): void {
    props.startFunction();
  }

  return (
    <Center>
      <View style={styles.square}>
        <Heading size="xl" letterSpacing={1} marginX={5} marginTop={5} color={'navy'}>
          Big 5 {'\n'}Personality Test
        </Heading>
        <Text color={'navy'} margin={5} lineHeight={23}>
          The Big 5 Personality Test is the most scientifically validated and reliable psychological
          model to measure personality. This self-report test measures the big five personality
          traits using the IPIP Big-Five Factor Markers.
        </Text>
        <Text marginX={5} fontWeight={'300'}>Estimated time: 15 minutes</Text>
      </View>
      <Pressable style={styles.button} onPress={onPressStart} marginTop={10} marginBottom={3}>
        <Text style={styles.text}>{'Start'}</Text>
      </Pressable>
      <Text color={'navy'}>Complete later</Text>
    </Center>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 340,
    height: 350,
    backgroundColor: '#D5D8FC',
    borderRadius: 10,
  },
  button: {
    width: 120,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: '#271E41',
    alignContent: 'center',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.6,
    color: 'white',
    fontSize: 15,
  },
});

export default Big5Start;
