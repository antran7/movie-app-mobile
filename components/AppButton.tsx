import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/colors";

interface AppButtonProps {
  title: string;
  icon?: any;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AppButton = ({ title, icon, onPress, style }: AppButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.container, style]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: Colors.text, fontWeight: "600", marginRight: 6 }}>
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 140,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#202020",
  },
});
