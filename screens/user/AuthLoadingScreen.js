import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, ActivityIndicator, useColorScheme } from "react-native";
import { COLORS } from "../../constants";

export default function AuthLoadingScreen(props) {
  useEffect(() => {
    async function handleUserNextScreen() {
      const userToken = await AsyncStorage.getItem("@ListApp:userToken");
      props.navigation.navigate(userToken ? "App" : "Auth");
    }

    handleUserNextScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

AuthLoadingScreen.navigationOptions = () => {
  return {
    header: null,
  };
};
