import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./screens/login&register/Login";
import RegisterPage from "./screens/login&register/Register";
import Home from "./screens/Home";
import Agenda from "./screens/Agenda";
import Notifications from "./screens/Notifications";
import Services from "./screens/services";
import Amendes from "./screens/Amendes";
import Suivi from "./screens/Suivi";
import Vignette from "./screens/Vignette";
import Assurances from "./screens/Assurances";
import Mesvehicules from "./screens/mesvehicules";
import ProfileScreen from "./screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from 'react-native-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isRegistered');
    console.log("Data retrieved from AsyncStorage:", data);
    setIsRegistered(data);
  }

  useEffect(() => {
    Font.loadAsync({
      Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    }).then(() => {
      setIsFontLoaded(true);
    });
    getData();
    setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 900);
  }, []);

  const renderTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#00000000",
          height: 70,
          paddingBottom:2,
          paddingTop:15,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 25,
        },
        // tabBarLabelStyle: {
        //   fontSize: 11,
        //   fontWeight: "600",
        //   marginTop: -10,
        //   letterSpacing: -0.3,
        //   textTransform: "uppercase",
        // },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let size = 30;
          if (route.name === "Home") {
            size = 27;
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Services") {
            size = 33;
            iconName = focused ? "briefcase" : "briefcase-outline";
          } 
        else if (route.name === "Agenda") {
          size = 27;
          iconName = focused ? "calendar" : "calendar-outline";
        }else if (route.name === "Mesvehicules") {
            size = 27;
            iconName = focused ? "car-outline" : "car-outline";
          } else if (route.name === "Profile") {
            size = 27;
            iconName = focused ? "person-sharp" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#FFB224" : "rgba(0, 0, 0, 0.5)"}
            />
          );
        },
        tabBarActiveTintColor: "#FFB224",
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.5)",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Services" component={Services} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Agenda" component={Agenda} options={{ tabBarLabel: '' }}/>
      <Tab.Screen name="Mesvehicules" component={Mesvehicules} options={{ tabBarLabel: '' }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}options={{ tabBarLabel: '' }} />
    </Tab.Navigator>
  );

  if (!isFontLoaded) {
    return null;}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          children={renderTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Amendes"
          component={Amendes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Suivi"
          component={Suivi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Assurances"
          component={Assurances}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vignette"
          component={Vignette}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;