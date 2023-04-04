import { Fragment, ReactNode } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { Box, Text, Center, Input, Progress, VStack, View, Pressable } from 'native-base';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.


// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given 
// (Notice the question mark). As well as a string for the question itself.
type QuestionProps = {
  children?: ReactNode;
  question: String;
};

const DatePickers = (props: QuestionProps) => {
  
  const [date, setDate] = useState(new Date)
  const [open, setOpen] = useState(false)
  return (
    <Center w="100%" color={"black"}>
      <VStack> 
      <Input mx="auto" editable={false} size="xl" borderColor={"F1C3A9"} border-radius={"10px"} isFullWidth onPressIn={() => setOpen(true)} value={(date.getMonth() + 1).toString() + "/" +
        date.getDate().toString() +  "/" + date.getFullYear().toString()} placeholder="Input" w="80%" />
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        title={null}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      </VStack>
   </Center>)
  
  return (
  <Center w="100%" color={"black"}>
   <DatePicker date={date} 
   maximumDate= {new Date(new Date().setFullYear(new Date().getFullYear() - 12))}
   onDateChange={setDate} 
   mode="date"
   androidVariant="nativeAndroid"/>
  </Center>)
    // This is how you can style a Nativebase component. For now we are going to inline them
    // just for ease of customization but we will later extract some things out for repeitiveness
  return (
    <Fragment>
      <Text
        fontSize={hp('3%')}
        ml={wp('10%')}
        mr={wp('20%')}
        mt={hp('3%')}
        color={'navy'}
        fontWeight="semibold"
        lineHeight={hp('3.2%')}
        letterSpacing={wp('0.23%')}>
        {props.question}
      </Text>
      {props.children}
    </Fragment>
  );
};

export default DatePickers;



