import React from "react";

import { View, StyleSheet, Alert } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

import AsyncStorage from "@react-native-community/async-storage";

import { StackActions, NavigationActions } from "react-navigation";

function Camera({ navigation }) {
  const successAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Home" })],
  });

  const getMesa = (mesa) => {
    fetch("https://one-fork.herokuapp.com/api/table/id/" + mesa)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.error) {
          Alert.alert("QR Code inválido!");
        } else {
          try {
            Alert.alert(data.data.name + " - Bem-vindo!");
            await AsyncStorage.setItem(
              "idRestaurant",
              data.data.OrganizationId
            );
            navigation.dispatch(successAction);
          } catch (error) {
            Alert.alert("QR Code inválido!");
          }
        }
      })
      .catch((err) => {
        console.log("**************");
        console.log(err);
        Alert.alert("QR Code inválido!");
      });
  };

  const onSuccess = (e) => {
    getMesa(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner reactivate={true} onRead={onSuccess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Camera;
// Dummy Datas
