// import React, { useState } from "react";
// import { View, StyleSheet, Text, SafeAreaView, Pressable, Dimensions } from "react-native";

// //import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// //const { width, height } = Dimensions.get('window'); //not currently using, but could use for scaling text based on screen size
// //import {vw, vh} from 'react-native-viewport-units';

// //single button. color of background & text change when button is selected
// function SelectMultipleButton({title}) {
//   const [selected, setSelected] = useState(false);
//   const styles = StyleSheet.create({
//     selectMultiple: {
//       padding: 15,
//       borderRadius: 12, 
//       marginBottom: 20,
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       marginLeft: 5,
//       marginRight: 5
//     },
//     buttonText: {
//       fontSize: 28, 
//       fontWeight: 'bold'
//     },
//     })
//   return (
//     <Pressable
//         onPress={() => setSelected(!selected)}
//         style = {[styles.selectMultiple, { backgroundColor: selected ? "#C55415": "#F1C3A9" }]}
//       >
//         <Text style={[styles.buttonText, { color: selected ? "#FFFFFF" : "#271E41"}]}>{title}</Text>
//       </Pressable>

//   );
// }
//   //input array of button names in form of listOfButtonNames = [{key: 'keyNum', title: "buttonTitle"},...]
//   //Create one component that holds multiple buttons. Each button can be selected & unselected individually
// function SelectMultipleButtons({listOfButtonNames}) {
//   const styles = StyleSheet.create({
//     buttonSizeScale: {
//     flexShrink: 1,
//     marginLeft: 5,
//     flexWrap: 'wrap', 
//     alignItems: 'flex-start', //not sure what this is doing
//     alignContent: 'flex-start',
//     flexDirection: 'row',
//     }})
//   {/*buttons placed on same row if they fit, otherwise wrap to new line*/}
//   return (
//     <SafeAreaView style={styles.buttonSizeScale}>
//       {listOfButtonNames.map((element) => {
//         return (
//         <SelectMultipleButton key = {element.key} title = {element.title}/>
//         )})      
//       }
//     </SafeAreaView>

//   )}