import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  Home,
  Food,
  OrderDelivery,
  Camera,
  Like,
  Map,
  SignIn,
  SignUp,
  Cart,
  Profile,
  MakeReview,
  Restaurant,
} from "../screens";
import AuthLoadingScreen from "../screens/user/AuthLoadingScreen";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import { COLORS, icons } from "../constants";
import React from "react";
import { Image } from "react-native";

const BottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.cutlery}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.location}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
      },
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        tabBarLabel: "Camera",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.camera}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
      },
    },
    Like: {
      screen: Like,
      navigationOptions: {
        tabBarLabel: "Like",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.like}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
      },
    },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: {
        tabBarLabel: "Restaurant",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.restaurant}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: COLORS.primary,
      inactiveTintColor: COLORS.secondary,
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomTab,
    },
    Map,
    Camera,
    Profile,
    Like,
    Cart,
    Food,
    OrderDelivery,
    SignIn,
    Restaurant,
    MakeReview,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    tabBarComponent: (props) => <BottomTabBar {...this.props} />,
  }
);

const StackNavigatorContainer = createAppContainer(StackNavigator);

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
    App: StackNavigatorContainer,
  },
  {
    initialRouteName: "SignIn",
    headerMode: "none",
    header: null,
  }
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: StackNavigatorContainer,
    // Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading",
  }
);

const RootStackContainer = createAppContainer(RootStack);

export default RootStackContainer;
