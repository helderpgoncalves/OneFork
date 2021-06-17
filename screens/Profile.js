import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

const Profile = ({ navigation }) => {
  var [user, setUser] = useState({});
  var [load, setLoad] = useState(false);

  useEffect(() => {
    if (!load) {
      setLoad(true);
      getInfo();
    }
  });

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

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        ></View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const getInfo = () => {
    fetch("https://one-fork.herokuapp.com/api/users/me")
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (!data.error) {
          setUser(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Eror na importação de dados");
      });
  };

  function renderPorfile() {
    return (
      <View>
        <Image
          source={icons.Profile}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{ textAlign: "center", padding: 10, fontSize: 30 }}>
          {user.name || ""}
        </Text>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 10,
            fontSize: 15,
            fontStyle: "italic",
          }}
        >
          {user.email || ""}
        </Text>
      </View>
    );
  }

  function renderLogout() {
    return (
      <View style={{ margin: 50 }}>
        <Button title="Sign Out" onPress={() => logout()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderPorfile()}
      {renderLogout()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
});

export default Profile;
