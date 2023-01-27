import "react-native-gesture-handler";
import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";

import HomeController from "../Screens/Home/HomeController";
import DetailController from "../Screens/Detail/DetailController";
import ProfileController from "../Screens/Profile/ProfileController";
import LogoutController from "../Screens/Logout/LogoutController";
import Colors from "../Styles/Colors";
// import { useManageNotification } from "../Services/Notification/useManageNotification";

import LoginController from "../Screens/Login/LoginController";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../Store/store";

import { Provider } from "react-redux";
import { useAppSelector } from "../Store/hooks";
import SignInController from "../Screens/SignIn/SignInController";

export type RootDrawerParamList = {
  Main: undefined;
  MyPositionDrawer: undefined;
  LoginDrawer: undefined;
};

export type RootStackParamList = {
  Produtos: undefined;
  Details: { itemID: string };
  MyPosition: undefined;
  Login: undefined;
  SignIn: undefined;
  LogoutHandler: undefined;
  Profile: { userName: string, email: string }
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

let screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
};

export const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produtos"
        component={HomeController}
        options={screenOptions}
      />
      <Stack.Screen
        name="Details"
        component={DetailController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export const StackProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

const RouteController = () => {    
    // useManageNotification();

    let drawerNavigation: DrawerNavigationOptions = {
      headerShown: false,
      drawerActiveTintColor: Colors.HeaderTintColor,
      drawerInactiveTintColor: Colors.NeutralMedium,
      drawerStyle: {
        backgroundColor: Colors.HeaderBackgroundColor,
        width: 240,
      },
    };

    const StackLogout = () => {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="LogoutHandler"
            component={LogoutController}
            options={{ ...screenOptions, title: "Logout" }}
          />
        </Stack.Navigator>
      );
    };

  const userInfo = useAppSelector((state) => state.login.user);
  if (userInfo && userInfo.token !== "") {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Principal">
          <Drawer.Screen
            name="ProfileView"
            component={StackProfile}
            options={{ drawerLabel: "Nome do usuário", ...drawerNavigation }}
          />
          <Drawer.Screen
            name="Principal"
            component={StackHome}
            options={{ drawerLabel: "Principal", ...drawerNavigation }}
          />
          <Drawer.Screen
            name="Favoritos"
            component={StackHome}
            options={{ drawerLabel: "Favoritos", ...drawerNavigation }}
          />
          <Drawer.Screen
            name="Logout"
            component={StackLogout}
            options={{
              drawerLabel: "Logout",
              headerShown: false,
              ...drawerNavigation,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginController}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInController}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }

}

const RouteControllerManagement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(RouteControllerManagement);
