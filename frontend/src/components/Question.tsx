import { Fragment, ReactNode } from 'react';
import { Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type QuestionProps = {
  children?: ReactNode;
  question: String;
};

const Question = (props: QuestionProps) => {
  // This is how you can style a Nativebase component. For now we are going to inline them
  // just for ease of customization but we will later extract some things out for repeitiveness
  return (
    <Fragment>
      <Text
        fontSize={hp('3%')}
        ml={wp('8%')}
        mr={wp('20%')}
        mt={hp('5%')}
        mb={hp('3%')}
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

export default Question;
