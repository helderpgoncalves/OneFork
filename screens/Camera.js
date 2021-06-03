import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

import AsyncStorage from "@react-native-community/async-storage";

function Camera({ navigation }) {
  var [ idMesa, setIdMesa ] = useState("");

  getMesa = () => {
    fetch("https://one-fork.herokuapp.com/api/Organization")
      .then((response) => response.json())
      .then((data) => {
        setRestaurantes(data);
        checkIfImInRestaurant(data);
      });
  };

  onSuccess = async (e) => {
    setIdMesa(e.data);
    await AsyncStorage.setItem("idMesa", e.data);
    /*Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err)
    );*/
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner reactivate={true} onRead={onSuccess} />
      <Text>{idMesa}</Text>
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
