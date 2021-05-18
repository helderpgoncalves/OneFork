import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import GetLocation from "react-native-get-location";
import { useEffect, useState } from "react";

const Map = ({ navigation }) => {
  const [region, setRegion] = useState({});

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setRegion(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      loadingEnabled
      showsUserLocation
      region={{
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
};

export default Map;
