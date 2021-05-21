import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Form from "react-native-basic-form";
import api from "../../services/api/api";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const fields = [
    { name: "email", label: "Email Address", required: true },
    { name: "password", label: "Password", required: true, secure: true },
  ];
  let formProps = { title: "Login", fields, onSubmit, loading };

  async function saveUser(user) {
    await AsyncStorage.setItem("@ListApp:userToken", JSON.stringify(user));
  }

  // trreste@tesddt.com
  async function onSubmit(state) {
    setLoading(true);
    try {
      const response = await api.post("/users/login", {
        email: state.email,
        password: state.password,
      });

      const token = response.data;
      await saveUser(token);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "App" })],
      });
      setLoading(false);

      navigation.dispatch(resetAction);

    } catch (err) {
      console.log(err.message);
      Alert.alert("Login failed. Please try");
      setLoading(false);
    }
  }

  return (
    <View style={styles.master}>
      <Text style={styles.header}>OneFork</Text>
      <Form {...formProps}>
        <View style={styles.link}>
          <Text style={styles.text}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.text}>Sign up Here.</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  master: {
    marginVertical: 150,
    alignContent: "center",
    padding: 20,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    marginBottom: 18,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 16,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SignIn;
