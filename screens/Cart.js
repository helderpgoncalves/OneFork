import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { icons, COLORS, SIZES, FONTS } from "../constants";

const Cart = ({ route, navigation, restaurant }) => {
  function renderHeader() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
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

        {/* Restaurant Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 50,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Carrinho</Text>
        </View>
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate("Restaurant", {
            item,
            currentLocation,
          })
        }
      >
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

          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
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
          <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                    {" "}
                    .{" "}
                  </Text>
                </View>
              );
            })}

            {/* Price */}
            {[1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}
              >
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  function renderPayment() {
    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>3 items in Cart</Text>
            <Text style={{ ...FONTS.h3 }}>30 €</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                Mesa 4
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                8888
              </Text>
            </View>
          </View>

          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate("OrderDelivery", {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isIphoneX() && (
          <View
            style={{
              position: "absolute",
              bottom: -34,
              left: 0,
              right: 0,
              height: 34,
              backgroundColor: COLORS.white,
            }}
          ></View>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderPayment()}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
  },
});
