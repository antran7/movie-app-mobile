import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import Colors from "@/constants/colors";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const RightIcon = ({ icon, onPress }: { icon?: any; onPress?: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.righticonwrapper}
    >
      {icon ? icon : <Feather name="search" size={24} color={Colors.text} />}
    </TouchableOpacity>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors.gray,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderColor: Colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={20} color={color} />
          ),
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="play-circle" size={20} color={color} />
          ),
          tabBarLabel: "Movies",
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: "",
          headerRight: () => {
            return <RightIcon onPress={() => router.push("/search")} />;
          },
          headerLeft: () => <Text style={styles.title}>Movies</Text>,
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="folder" size={20} color={color} />
          ),
          tabBarLabel: "TV/Series",
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: "",
          headerRight: () => {
            return <RightIcon onPress={() => router.push("/search")} />;
          },
          headerLeft: () => <Text style={styles.title}>Tv Series</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={20} color={color} />
          ),
          tabBarLabel: "Me",
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: "",
          headerRight: () => {
            return (
              <RightIcon
                icon={
                  <MaterialCommunityIcons
                    name="cog-outline"
                    size={24}
                    color={Colors.text}
                  />
                }
                onPress={() => {}}
              />
            );
          },
          headerLeft: () => <Text style={styles.title}>Profile</Text>,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  righticonwrapper: {
    height: 45,
    width: 45,
    backgroundColor: "#202020",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  title: {
    color: Colors.text,
    marginLeft: 14,
    fontWeight: "600",
    fontSize: 24,
  },
});
