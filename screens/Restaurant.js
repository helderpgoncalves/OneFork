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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getRestaurant = (id) => {
    fetch("https://one-fork.herokuapp.com/api/Organization/id/"+id)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data["data"]);
        setLoading(false);
      }).catch(function(error){
        console.log(error);
      })
  };

  useEffect(() => {
    getRestaurantId();
    console.log(restaurant);
  }, []);

  const restaurantData = [
    {
      id: 1,
      name: "Hamburguer de Top",
      description: "Boa comida , bom ambiente , empregados de mesa 5 estrelas.",
      rating: 4.8,
      user: "Hélder Gonçalves",
      photo: {
        uri:
          "https://media-cdn.tripadvisor.com/media/photo-s/10/4f/80/f5/photo4jpg.jpg",
      },
    },
    {
      id: 2,
      name: "O meu lugar preferido",
      description:
        "Boa comida , bom ambiente , empregados de mesa 5 estrelas .",
      rating: 4.8,
      user: "José Carlos",
      categories: [2, 4, 6],
      priceRating: expensive,
      photo: {
        uri:
          "data:image/jpeg;base64,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",
      },
      duration: "15 - 20 min",
      location: {
        latitude: 1.556306570595712,
        longitude: 110.35504616746915,
      },
      courier: {
        avatar: images.avatar_2,
        name: "Jackson",
      },
    },
    {
      id: 3,
      name: "Cachorro Quente",
      description:
        "Boa comida , bom ambiente , empregados de mesa 5 estrelas .",

      rating: 4.8,
      categories: [3],
      priceRating: expensive,
      photo: {
        uri:
          "https://cdn.website.dish.co/media/d1/d7/1472150/Cerqueiras-Lounge-und-Restaurante-8D21E4DB-BD24-4C4E-9C00-BAB573E68897.jpg",
      },
      duration: "20 - 25 min",
      location: {
        latitude: 1.5238753474714375,
        longitude: 110.34261833833622,
      },
      courier: {
        avatar: images.avatar_3,
        name: "James",
      },
    },
    {
      id: 4,
      name: "Sushi",
      description:
        "Boa comida , bom ambiente , empregados de mesa 5 estrelas .",

      rating: 4.8,
      categories: [8],
      priceRating: expensive,
      photo: {
        uri:
          "data:image/jpeg;base64,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",
      },
      duration: "10 - 15 min",
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: images.avatar_4,
        name: "Ahmad",
      },
    },
    {
      id: 5,
      name: "Cuisine",
      description:
        "Boa comida , bom ambiente , empregados de mesa 5 estrelas .",

      rating: 4.8,
      categories: [1, 2],
      priceRating: affordable,
      photo: images.noodle_shop,
      duration: "15 - 20 min",
      location: {
        latitude: 1.558050496260768,
        longitude: 110.34743759630511,
      },
      courier: {
        avatar: images.avatar_4,
        name: "Muthu",
      },
    },
    {
      id: 6,
      name: "Dessets",
      description:
        "Boa comida , bom ambiente , empregados de mesa 5 estrelas .",

      rating: 4.9,
      categories: [9, 10],
      priceRating: affordable,
      photo: images.kek_lapis_shop,
      duration: "35 - 40 min",
      location: {
        latitude: 1.5573478487252896,
        longitude: 110.35568783282145,
      },
      courier: {
        avatar: images.avatar_1,
        name: "Jessie",
      },
    },
  ];

  function followRestaurant() {
    setIamFollow((prevIamFollow) => !prevIamFollow);
    console.log("Am i follow this restaurant ? " + amIfollow);
  }
  function whatToRender() {
    if (clicked == "About") {
      return renderAbout();
    } else if (clicked == "Reviews") {
      return renderRestaurantReviews();
    } else {
      return renderFollowers();
    }
  }

  function renderAbout() {
    return (
      <View>
        <Text>Ola</Text>
      </View>
    );
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
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
        </View>

        <View style={styles.profileDetail}>
          <TouchableOpacity onPress={() => setClicked("Reviews")}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Reviews</Text>
              <Text style={styles.count}>{restaurantData.length}</Text>
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

  function renderRestaurantReviews() {
    const renderItem = ({ item }) => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
        <Text style={{ ...FONTS.body3 }}>{item.description}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          <Text style={{ ...FONTS.body3, marginRight: 10 }}>{item.user}</Text>

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
        data={restaurantData}
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
