import React from "react";

import { Linking } from "react-native";

import QRCode from 'react-native-qrcode-svg';

onSuccess = (e) => {
  Linking.openURL(e.data).catch((err) =>
    console.error("An error occured", err)
  );
};
const GerarQRCode = ({ route, navigation }) => {
  return (
    <QRCode
      value={route.params.value}
    />
  );
};

export default GerarQRCode;
