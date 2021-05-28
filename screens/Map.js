import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { COLORS, icons } from "../constants";

let lat;
let lng;

const Map = ({ navigation }) => {
  const [region, setRegion] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantes, setRestaurantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState(0);

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        lat1 = JSON.stringify(position.coords.latitude);
        lng1 = JSON.stringify(position.coords.longitude);
        lat = lat1;
        lng = lng1;
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
  };

  function verMenu() {
    console.log("TODO - Ver menu");
  }
  getRestaurantes = () => {
    fetch("https://one-fork.herokuapp.com/api/Organization")
      .then((response) => response.json())
      .then((data) => {
        setRestaurantes(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    findCoordinates();
    getRestaurantes();
  }, []);

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    // setRegion(newRegion);
    // mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    // setRegion(newRegion);
    //  mapView.current.animateToRegion(newRegion, 200);
  }

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <Modal // modal para escolher trajeto ou multi objetivo
            style={{ backgroundColor: "transparent" }}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={[styles.container2, styles.center]}>
              {restaurantes
                .filter((marker) => marker.id == dados)
                .map((marker) => (
                  <View style={[styles.wrap]} key={marker.id}>
                    <Text style={styles.title}>{marker.name}</Text>
                    <Text></Text>
                    <Text> </Text>
                    <Text style={styles.text}>Morada: {marker.address}</Text>
                    <Text> </Text>
                    <Text style={styles.text}>Contacto: {marker.celphone}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.center]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={{ color: COLORS.primary }}>Fechar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          </Modal>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            loadingEnabled
            showsUserLocation
            region={{
              latitude: Number(lat),
              longitude: Number(lng),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {restaurantes.map((marker) => (
              <Marker
                key={marker.id}
                title={marker.name}
                coordinate={{
                  latitude: Number(marker.latLocation),
                  longitude: Number(marker.longLocation),
                }}
              >
                <Image
                  source={icons.restaurantMarker}
                  style={{ width: 50, height: 50 }}
                />
                <Callout
                  tooltip
                  onPress={() => {
                    setModalVisible(true);
                    setDados(marker.id);
                  }}
                >
                  <View style={styles.wrap2}>
                    <Text style={styles.title2}>{marker.name}</Text>

                    <Text style={styles.info}>Ver mais informações</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  title2: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  wrap: {
    alignContent: "center",
    padding: 30,
    margin: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#4048BF",
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  wrap2: {
    justifyContent: "center",
    height: 60,
    width: 180,
    alignContent: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#4048BF",
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "transparent",
    borderRadius: 100,
    borderColor: "#ffffff",
    marginTop: 64,
    borderWidth: 1,
    paddingTop: 16,
    borderWidth: 1,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginHorizontal: 5,
    flex: 1,
  },
});

export default Map;
