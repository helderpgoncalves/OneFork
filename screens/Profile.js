import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Profile = ({ navigation }) => {
  const token = React.useState(null);

  async function logout() {
    console.log(AsyncStorage.getItem("@CodeApi:token"));
    await AsyncStorage.removeItem("@CodeApi:token");
  }

  return (
    <View>
      <Text style={{ paddingTop: 200, textAlign: "center" }}>Profile</Text>
      <Button title="Sign Out" onPress={() => logout()} />
    </View>
  );
};

export default Profile;
