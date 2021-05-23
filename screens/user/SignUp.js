import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Form from "react-native-basic-form";
import api from "../../services/api/api";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";
import { COLORS } from "../../constants";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "name", label: "name", required: true },
    { name: "email", label: "Email Address", required: true },
    { name: "password", label: "Password", required: true, secure: true },
    { name: "address", label: "Address", required: true },
    { name: "fiscalNumber", label: "Fiscal Number", required: false },
  ];

  async function saveUser(user) {
    await AsyncStorage.setItem("@ListApp:userToken", JSON.stringify(user));
  }

  // trreste@tesddt.com
  async function onSubmit(state) {
    setLoading(true);
    try {
      const response = await api.post("/users/create", {
        name: state.name,
        email: state.email,
        password: state.password,
        address: state.address,
        fiscalNumber: state.fiscalNumber,
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
      setLoading(false);
    }
  }

  let formProps = { title: "Register", fields, onSubmit, loading };

  return (
    <View style={styles.master}>
      <Text style={styles.header}>OneFork</Text>
      <Form {...formProps}>
        <View style={styles.link}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.text2}>Sign In Here.</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  master: {
    marginTop: 150,
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
    color: COLORS.black,
    marginTop: 16,
  },
  text2: {
    fontSize: 16,
    color: "blue",
    marginTop: 16,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SignUp;
