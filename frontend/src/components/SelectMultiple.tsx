import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, Dimensions } from 'react-native';

//import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
//const { width, height } = Dimensions.get('window'); //not currently using, but could use for scaling text based on screen size
//import {vw, vh} from 'react-native-viewport-units';

//single button. color of background & text change when button is selected

type SingleButtonProps = {
  handleChange: any;
  state: any;
  stateName: string;
  title: string;
};

type SelectMultipleButtonProps = {
  handleChange: any;
  state: any;
  stateName: string;
  listOfButtonNames: string[];
  subtitle: string;
};

const SingleButton = (props: SingleButtonProps) => {
    const getSelected = () => {
    return props.state.includes(props.title);
    };

    const updateSelected = () => {
        props.handleChange(props.stateName, props.title);
        setSelected(!selected);
    //   return props.state.includes(props.title);
    };

    const [selected, setSelected] = useState(getSelected());
  const styles = StyleSheet.create({
    selectMultiple: {
      padding: 15,
      borderRadius: 12,
      marginBottom: 20,
      alignItems: 'center',
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
    },
    buttonText: {
      fontSize: 28,
      fontWeight: 'bold',
    },
  });



  return (
    <Pressable
      onPress={() => updateSelected()}
      style={[styles.selectMultiple, { backgroundColor: selected ? '#C55415' : '#F1C3A9' }]}>
      <Text style={[styles.buttonText, { color: selected ? '#FFFFFF' : '#271E41' }]}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  italic: { fontStyle: 'italic' },
});
//input array of button names in form of listOfButtonNames = [{key: 'keyNum', title: "buttonTitle"},...]
//Create one component that holds multiple buttons. Each button can be selected & unselected individually
export const SelectMultipleButtons = (props: SelectMultipleButtonProps) => {
  const styles = StyleSheet.create({
    buttonSizeScale: {
      flexShrink: 1,
      marginLeft: 5,
      flexWrap: 'wrap',
      alignItems: 'flex-start', //not sure what this is doing
      alignContent: 'flex-start',
      flexDirection: 'row',
    },
    subtitleText: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });
  {
    /*buttons placed on same row if they fit, otherwise wrap to new line*/
  }
  return (
    <SafeAreaView style={styles.buttonSizeScale}>
      <Text style={styles.subtitleText}>{props.subtitle}</Text>
      <Text></Text>
      {props.listOfButtonNames.map((element, key) => {
        return <SingleButton state={props.state} handleChange = {props.handleChange} stateName={props.stateName} key={key} title = {element} />;
      })}
    </SafeAreaView>
  );
};

export default SelectMultipleButtons;
