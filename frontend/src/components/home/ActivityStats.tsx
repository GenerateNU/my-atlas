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
        Activity
      </Text>
      <VStack space={hp('3%')}>
        <HStack justifyContent="space-between">
          <ActivityCard title={'Steps'} currentDayValue={20} metric={'steps'}/>
          <ActivityCard title={'Distance'} currentDayValue={20} metric={'mi'}/>
        </HStack>
        <HStack justifyContent="space-between">
          <ActivityCard title={'Active Energy Burned'} currentDayValue={20} metric={'cal'}/>
          <ActivityCard title={'Heart Rate Average'} currentDayValue={20} metric={'bpm'}/>
        </HStack>
        <HStack justifyContent="space-between">
          <ActivityCard title={'Resting Heart Rate Average'} currentDayValue={20} metric={'bpm'}/>
          <ActivityCard title={'Sleep Time'} currentDayValue={20} metric={'hours'}/>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default ActivityStats;
