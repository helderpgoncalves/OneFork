import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {Home, Map, Camera, Cart, Profile, Like, Food, SignIn, SignUp} from "../screens";
import AuthLoadingScreen from "../screens/user/AuthLoadingScreen";

const StackNavigator = createStackNavigator(
  {
    Home,
    Map,
    Camera,
    Cart, 
    Profile,
    Like,
    Food,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const StackNavigatorContainer = createAppContainer(StackNavigator);

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
    SignUp, SignUp,
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
