import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";

const FilterItem = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.categorywrapper}>
      <Text style={{ color: Colors.text, marginRight: 6, fontSize: 12 }}>
        {title}
      </Text>
      <Entypo name="chevron-small-down" size={20} color={Colors.text} />
    </TouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  categorywrapper: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 8,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 14,
  },
});
