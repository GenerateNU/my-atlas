// import React, {FC, useEffect} from 'react';
// import {View, StyleSheet, SafeAreaView, PixelRatio} from 'react-native';

// import Animated, {
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import Svg, {Circle} from 'react-native-svg';

// //properties to pass into circular progress bar
// type CircularProgressProps = {
//   strokeWidth: number;
//   radius: number;
//   strokeColor: string;
//   backgroundColor: string;
//   percentageComplete: number;
//   animationDuration: number;
// };

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// export const CircularProgress: FC<CircularProgressProps> = ({
//   radius,
//   strokeWidth,
//   strokeColor,
//   backgroundColor,
//   percentageComplete,
//   animationDuration,
// }) => {
//   const innerRadius = radius - strokeWidth / 2;
//   const circumference = 2 * Math.PI * innerRadius;
//   const invertedCompletion = (100 - percentageComplete) / 100;

//   const theta = useSharedValue(2 * Math.PI * 1.001);
//   const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);

//   const animationTime = animationDuration

//   //animates the stroke moving around the circle
//   const animatedProps = useAnimatedProps(() => {
//     return {
//       strokeDashoffset: withTiming(theta.value * innerRadius, {
//         duration: animationTime,
//       }),
//     };
//   });

//   useEffect(() => {
//     theta.value = animateTo.value
//       });

//   const styles = StyleSheet.create({
//     backgroundContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     ringChartContainer: {
//       width: radius * 2,
//       height: radius * 2,
//     },
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
// });

//   return (
//     <SafeAreaView style={styles.backgroundContainer}>
//       <SafeAreaView style={styles.ringChartContainer}>
//         <SafeAreaView style={styles.container}>
//           <Svg style={StyleSheet.absoluteFill}>
//             <Circle
//               cx={radius}
//               cy={radius}
//               fill={'transparent'}
//               r={innerRadius}
//               stroke= {backgroundColor}
//               strokeDasharray={`${circumference} ${circumference}`}
//               strokeWidth={strokeWidth}
//               strokeLinecap="round"
//             />
//             <AnimatedCircle
//               animatedProps={animatedProps}
//               cx={radius}
//               cy={radius}
//               fill={'transparent'}
//               r={innerRadius}
//               stroke={strokeColor}
//               strokeDasharray={`${circumference} ${circumference}`}
//               strokeWidth={strokeWidth}
//               strokeLinecap="round"
//             />
//           </Svg>
//         </SafeAreaView>
//       </SafeAreaView>
//     </SafeAreaView>
//   );
// };

// export default CircularProgress;