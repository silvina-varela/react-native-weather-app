import React from "react";
import UpcomingWeather from "../screens/UpcomingWeather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Weather from "../screens/Weather";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Tabs = ({ weather }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "white",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={"Today"}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="today-outline"
              size={25}
              color={focused ? "tomato" : "black"}
            />
          ),
        }}
      >
        {() => <Weather weatherData={weather.list[0]} city={weather.city} />}
      </Tab.Screen>
      
      <Tab.Screen
        name={"Upcoming"}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={"clock"}
              size={25}
              color={focused ? "tomato" : "black"}
            />
          ),
        }}
      >
        {() => <UpcomingWeather weatherData={weather.list} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
