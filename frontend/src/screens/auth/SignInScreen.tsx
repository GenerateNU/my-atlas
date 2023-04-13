import { ActivityIndicator, Pressable, SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar";
import YesNo from "../../components/YesNo";
import HelloAgain from "../../components/HelloAgain";
import { useSignUp } from "../../contexts/SignUpContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";


const SignInScreen = ({route, navigation}) => {
  // const { props } = route.params;
  const { authData, loading, signIn, signOut } = useAuth();
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();


  const back = async () => {
    navigation.navigate("Access Screen");
  };


  const signInFunction = async (email, password) => {
    console.log(email, password)
    // signIn(email, password);
  };

  const googleFunction = async () => {
    // handleChange(props.stateName, true);
    // Alert.alert('no function');
  };

  const appleFunction = async () => {
    // handleChange(props.stateName, true);
    // Alert.alert('no function');
  };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F1' }}>
        <ProgressBar
          progress={20}
          hasSkip={false}
          hasProgress={false}
          backFunction={back}></ProgressBar>
        <HelloAgain
          signInFunction={signInFunction}
          googleFunction={undefined}
          appleFunction={undefined}
          clicked={undefined}
          handleChange={handleChange}></HelloAgain>
      </SafeAreaView>
    );
}

export default SignInScreen;