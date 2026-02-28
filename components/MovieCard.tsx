import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { hs, ms, vs } from "@/screen-dimensions";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";

interface MovieCardProps {
  image?: ImageSourcePropType | undefined;
  title: string;
  genre: string;
}

const MovieCard = ({ genre, title, image }: MovieCardProps) => {

  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/details")} activeOpacity={0.8} style={styles.container}>
      <Image
        style={styles.image}
        source={image}
      />

      <View>
        <Text
          numberOfLines={1}
          style={{ color: Colors.text, fontWeight: "600", fontSize: ms(14) }}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: Colors.gray, fontSize: ms(10) }}
        >
          {genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: hs(110),
    marginHorizontal: 8,
    marginBottom: 14,
  },
  image: {
    height: vs(150),
    width: "100%",
    borderRadius: 10,
  },
});
