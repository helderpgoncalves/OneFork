import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";

const Profile = ({ navigation }) => {
  async function logout() {
    try {
      await AsyncStorage.removeItem("@ListApp:userToken");
      Alert.alert("Logged Out");
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "SignIn" })],
      });
      navigation.dispatch(resetAction);
    } catch (e) {
      throw e;
    }
  }

  return (
    <View>
      <Text style={{ paddingTop: 200, textAlign: "center" }}>Profile</Text>
      <Button title="Sign Out" onPress={() => logout()} />
    </View>
  );
};

export default Profile;
