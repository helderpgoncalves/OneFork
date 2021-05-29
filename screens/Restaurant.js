import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api/api";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Restaurant = ({ navigation, route }) => {
  const [amIfollow, setIamFollow] = React.useState(false);
  const [clicked, setClicked] = React.useState("About");
  const [reviews, setReviews] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState([]);

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  getRestaurantId = async () => {
    try {
      const restaurantId = await AsyncStorage.getItem("idRestaurant");
      if (restaurantId !== null) {
        getRestaurant(restaurantId);
        getReviews();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getRestaurant = (id) => {
    fetch("https://one-fork.herokuapp.com/api/Organization/id/" + id)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(Object.values(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getReviews = (id) => {
    fetch("http://one-fork.herokuapp.com/api/review/idOrganization/" + id)
      .then((response) => response.json())
      .then((data) => {
        if (Object.values(data)[0].name === "SequelizeDatabaseError") {
          // No reviews to show
          setReviews([]);
          setLoading(false);
        } else {
          setReviews(Object.values(data));
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getRestaurantId();
  }, []);

  function followRestaurant() {
    setIamFollow((prevIamFollow) => !prevIamFollow);
    console.log("Am i follow this restaurant ? " + amIfollow);
  }
  function whatToRender() {
    if (clicked == "About") {
      return renderAbout();
    } else if (clicked == "Reviews") {
      return renderReviews();
    } else {
      return renderFollowers();
    }
  }

  function renderAbout() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text
            style={{
              fontSize: SIZES.body1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {restaurant[0].name}
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: SIZES.body2,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Localização: {restaurant[0].address}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              marginTop: 20,
              fontSize: SIZES.body2,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Contacto: {restaurant[0].phone}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}
          >
            <Button
              buttonStyle={{ borderColor: COLORS.primary }}
              titleStyle={{ color: COLORS.primary }}
              type="outline"
              onPress={() => obterDirecoes()}
              icon={
                <Icon name="location-arrow" size={32} color={COLORS.primary} />
              }
              iconRight
              title="Obter Direções "
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}
          >
            <Button
              onPress={() => ligarRestaurante()}
              buttonStyle={{ backgroundColor: COLORS.primary }}
              titleStyle={{ color: COLORS.white }}
              icon={<Icon name="phone-square" size={32} color="white" />}
              iconRight
              title="Ligar para o estabelicimento    "
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 500 }} />
      </View>
    );
  }

  function obterDirecoes() {
    console.log("Obter Direcoes");
  }

  function ligarRestaurante() {
    console.log("Ligar Restaurante");
  }

  function renderFollowers() {
    return (
      <View>
        <Text>Followers</Text>
      </View>
    );
  }
  function restaurantHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  "https://cdn.website.dish.co/media/f9/32/1472085/Cerqueiras-Lounge-und-Restaurante-36B01405-C09B-4F2E-80BD-6F48AAEDC8A9.jpg",
              }}
            />
            <Text style={styles.name}>{restaurant[0].name}</Text>
          </View>
        </View>

        <View style={styles.profileDetail}>
          <TouchableOpacity onPress={() => setClicked("Reviews")}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Reviews</Text>
              <Text style={styles.count}>{reviews.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setClicked("Followes")}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Followers</Text>
              <Text style={styles.count}>200</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setClicked("About")}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>About</Text>
              <Image source={icons.menu} style={{ width: 20, height: 20 }} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContent}></View>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: COLORS.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          ></View>
        </View>
        <TouchableOpacity
          onPress={() => followRestaurant()}
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          {amIfollow ? (
            <Image
              source={icons.follower}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          ) : (
            <Image
              source={icons.unfriend}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  function renderReviews() {
    const renderItem = ({ item }) => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.title}</Text>
        <Text style={{ ...FONTS.body3 }}>{item.description}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          <Text style={{ ...FONTS.body3, marginRight: 10 }}>Hélder</Text>

          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>{item.rating}/5</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          ></View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={reviews}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 400,
          backgroundColor: "white",
        }}
      />
    );
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
        <View style={{ backgroundColor: "white" }}>
          <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
            {renderHeader()}
          </SafeAreaView>
          {restaurantHeader()}
          {whatToRender()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    marginBottom: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: 200,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: COLORS.lightGray2,
  },
  detailContent: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: COLORS.primary,
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
});

export default Restaurant;
