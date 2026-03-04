import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "@/app/types";
import { TMDB_IMAGE_BASE_PATH } from "@/hooks/useFetch";
import { default_image } from "@/app/utils/assets";
import { getGenreString } from "@/app/utils/genres";

const OverViewSection = ({ movie }: { movie: Movie | null }) => {
  const backdrop_image = movie?.backdrop_path
    ? `${TMDB_IMAGE_BASE_PATH}${movie?.backdrop_path}`
    : null;
  const yearRelease = movie?.release_date?.split("-")[0] ?? "";

  return (
    <View style={styles.overview}>
      <Image
        style={styles.overviewImage}
        source={backdrop_image ? { uri: backdrop_image } : default_image}
      />

      {/* Image Overlay */}
      <View style={styles.cover}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styles.profile}
                source={require("@/assets/images/profile.jpg")}
              />

              <View style={{ marginLeft: 8 }}>
                <Text style={styles.greeting}>Hi, An Tran 👋</Text>
                <Text style={{ color: Colors.text, fontSize: 16 }}>
                  Welcome Back
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.searchWrapper} activeOpacity={0.8}>
              <Feather name="search" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <LinearGradient
          style={styles.blur}
          colors={["transparent", Colors.background]}
        >
          <View style={styles.categoryBadge}>
            <Text
              style={{ color: Colors.text, fontWeight: "500", fontSize: 16 }}
            >
              Series
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: 26, fontWeight: "600", color: Colors.text }}
            >
              {movie?.original_title}
            </Text>
            <View style={{ width: 75, alignItems: "flex-end" }}>
              <TouchableOpacity activeOpacity={0.8} style={styles.playbtn}>
                <FontAwesome5 name="play" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{ color: Colors.gray }}>
            {`${yearRelease} | ${getGenreString(movie?.genre_ids || [])}`}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default OverViewSection;

const styles = StyleSheet.create({
  overview: {
    height: 400,
    position: "relative",
  },
  overviewImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  cover: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  profile: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  greeting: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 22,
  },
  searchWrapper: {
    height: 50,
    width: 50,
    backgroundColor: "#535456",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  blur: {
    height: 150,
    width: "100%",
    padding: 14,
    justifyContent: "space-around",
  },
  categoryBadge: {
    padding: 8,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    alignItems: "center",
    width: 100,
  },
  playbtn: {
    height: 60,
    width: 60,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
});
