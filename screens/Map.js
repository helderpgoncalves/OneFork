import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import GetLocation from "react-native-get-location";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants";

const Map = ({ navigation }) => {
  const [region, setRegion] = useState({});
  const [loading, setLoading] = useState(true);

  // TODO
  
  useEffect(() => {
    async function getMyPosition() {
      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then((location) => {
          setRegion(location);
          setLoading(false);
        })
        .catch((error) => {
          const { message } = error;
        //  console.warn(message);
        });
    }
    while (region.latitude == undefined) {
      getMyPosition();
    }
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
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
      )}
    </>
  );
};

export default Map;
