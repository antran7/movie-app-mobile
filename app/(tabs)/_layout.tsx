import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/colors";
import { Feather, Octicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors.gray,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
            backgroundColor: Colors.background,
            borderColor: Colors.background,
        }
      }}
    >
      <Tabs.Screen name="(home)/index" options={{
        tabBarIcon: ({color}) => (
            <Feather name="home" size={20} color={color} />
        ),
        tabBarLabel: "Home",
        headerShown: false,
      }}/>
      <Tabs.Screen name="movies" options={{
        tabBarIcon: ({color}) => (
            <Feather name="play-circle" size={20} color={color} />
        ),
        tabBarLabel: "Movies",
        headerShown: false,
      }}/>
      <Tabs.Screen name="series" options={{
        tabBarIcon: ({color}) => (
            <Feather name="folder" size={20} color={color} />
        ),
        tabBarLabel: "TV/Series",
        headerShown: false,
      }}/>
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({color}) => (
            <Octicons name="person" size={20} color={color} />
        ),
        tabBarLabel: "Me",
        headerShown: false,
      }}/>
    </Tabs>
  );
};

export default TabLayout;
