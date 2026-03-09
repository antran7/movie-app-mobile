import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";

const SectionHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View style={styles.sectionHeader}>
      <Text style={{ color: Colors.text, fontWeight: "600", fontSize: 16 }}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => router.push("/movies")} activeOpacity={0.8} style={{ padding: 10 }}>
        <Text style={{ color: Colors.primary }}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 14,
  },
});
