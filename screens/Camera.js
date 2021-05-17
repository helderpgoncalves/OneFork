import React, { Component } from "react";

import { Linking, View, StyleSheet} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

onSuccess = (e) => {
  Linking.openURL(e.data).catch((err) =>
    console.error("An error occured", err)
  );
};
const Camera = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <QRCodeScanner
        reactivate={true}
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})

export default Camera;
// Dummy Datas
