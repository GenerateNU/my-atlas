import { Box, Text } from 'native-base';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

type ActivityCardProps = {
  title: string;
  currentDayValue: number;
};

const ActivityCard = (props: ActivityCardProps) => {
  return (
    <Box backgroundColor={'white'} width={wp('30%')}>
      <Text
        fontSize={hp('2.5%')}
        color={'midnight'}
        fontFamily="heading"
        fontWeight={'700'}
        fontStyle={'normal'}
        letterSpacing={wp('0.1%')}>
        {props.title}
      </Text>
    </Box>
  );
};

export default ActivityCard;
