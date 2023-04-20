import { HStack, ScrollView, Text, VStack } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActivityCard from './ActivityCard';

type ActivityStatsProps = {
  userID: string;
  token: string;
};

const ActivityStats = (props: ActivityStatsProps) => {
  return (
    <ScrollView marginX={wp('6%')} marginTop={hp('2%')}>
      <Text
        fontSize={hp('2.5%')}
        color={'midnight'}
        fontFamily="heading"
        fontWeight={'700'}
        fontStyle={'normal'}
        letterSpacing={wp('0.1%')}>
        {' '}
        Activity
      </Text>
      <VStack>
        <HStack justifyContent="space-between">
          <ActivityCard title={'Steps'} currentDayValue={20} />
          <ActivityCard title={'Steps'} currentDayValue={20} />
        </HStack>
        <HStack justifyContent="space-between"></HStack>
        <HStack justifyContent="space-between"></HStack>
      </VStack>
    </ScrollView>
  );
};

export default ActivityStats;
