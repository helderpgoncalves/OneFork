import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Form from "react-native-basic-form";
import { COLORS } from "../../constants";
import { Context as UserContext } from "../../services/userAccessContext";

const SignUp = ({ navigation }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fields = [
      { name: "firstName", label: "First Name", required: true },
      { name: "lastName", label: "Last Name", required: true },
      { name: "email", label: "Email Address", required: true },
      { name: "password", label: "Password", required: true, secure: true },
    ];
  const { state, onSignup, onDissmiss } = useContext(UserContext);

  async function onSubmit(state) {
    setLoading(true);
    try {
      onSignup(state);
      setLoading(false);
      if (user) navigate("Home");
    } catch (error) {
      setError(error.message);
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
