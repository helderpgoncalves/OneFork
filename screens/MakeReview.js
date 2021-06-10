import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { launchImageLibrary } from "react-native-image-picker";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { ScrollView } from "react-native-gesture-handler";
import api from "../services/api/api"

const MakeReview = ({ navigation }) => {
  const idRestaurant = navigation.getParam("idRestaurant");
  const [photo, setPhoto] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ratingCount, setRatingCount] = useState(3);

  const handleChoosePhoto = () => {
    console.log(idRestaurant);
    launchImageLibrary({ noData: true }, (response) => {
      // TODO ERRO
      if (response.assets[0]) {
        setPhoto(response.assets[0]);
      } else {
        setPhoto(null)
      }
    });
  };
  const postReview = async () => {
    if (title === "" || description == "") {
      Alert.alert("Existem campos vazios");
    } else {
      try {
        const response = await api.post("/review/create", {
          idOrganization: idRestaurant,
          idUser: "7d7f36f9-c90f-4cdf-9fd0-9d27e42edd6f",
          rating: ratingCount,
          title: title,
          description: description,
          image:
            "https://www.portugalfoods.org/wp-content/uploads/2020/04/PTFOODS-WEBSITE-1600-750.jpg",
        });
        console.log(response.data)
        navigation.navigate("Restaurant");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  function testing(){
    console.log("Rating: "+ratingCount)
    console.log("Restaurante: " + idRestaurant);
    console.log("title: "+title);
    console.log("description: " + description);
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
      </View>
    );
  }

  function renderPostReview() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {photo && (
          <>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: "100%", height: 300 }}
            />
          </>
        )}
        <Button
          onPress={() => handleChoosePhoto()}
          buttonStyle={{
            marginTop: 30,
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
          }}
          titleStyle={{ color: COLORS.white }}
          icon={<Icon name="upload" size={28} color="white" />}
          iconRight
          title="Upload Image     "
        />
        <Input
          style={{ marginTop: 30 }}
          containerStyle={{ width: "90%" }}
          placeholder="Title"
          onChangeText={(value) => setTitle(value)}
        />

        <Input
          placeholder="Description"
          multiline
          containerStyle={{ width: "90%" }}
          onChangeText={(value) => setDescription(value)}
        />

        <AirbnbRating
          onFinishRating={(rating) => setRatingCount(rating)}
          showRating={false}
          defaultRating="3"
          selectedColor={COLORS.primary}
        />

        <Button
          onPress={() => postReview()}
          buttonStyle={{
            marginTop: 30,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
          }}
          titleStyle={{ color: COLORS.white }}
          icon={<Icon name="chevron-circle-down" size={28} color="white" />}
          iconRight
          title="Post Review     "
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView>{renderPostReview()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default MakeReview;
