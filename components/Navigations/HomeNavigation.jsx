import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen/HomeScreen";
import OrchidDetailScreen from "../OrchidDetailScreen/OrchidDetailScreen";
const Tab = createBottomTabNavigator();
export default function HomeNavigation() {
  const tabOptions = {
    tabBarButton: () => null,
    tabBarStyle: { display: "none" },
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={tabOptions}
      />
      <Tab.Screen
        name="OrchidDetailScreen"
        component={OrchidDetailScreen}
        options={tabOptions}
      />
    </Tab.Navigator>
  );
}
