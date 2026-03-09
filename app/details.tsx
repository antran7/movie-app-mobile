import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "@/components/AppButton";
import SectionHeader from "@/components/SectionHeader";
import AnimatedMovieCard from "@/components/AnimatedMovieCard";
import { getGenreString } from "./utils/genres";
import { TMDB_IMAGE_BASE_PATH, useFetch } from "@/hooks/useFetch";
import { default_image } from "./utils/assets";
import { Movie } from "./types";
import { useFavorites } from "@/hooks/useFavorites";
import Toast from 'react-native-toast-message';

const DetailsScreen = () => {
  const router = useRouter();
  const { title, backdrop_path, date, generate_ids, overview, rating, id } =
    useLocalSearchParams<any>();
  const yearReleased = date?.split("-")[0] ?? "";
  const backdrop_image = backdrop_path
    ? `${TMDB_IMAGE_BASE_PATH}${backdrop_path}`
    : null;

  const { addFavorite, isFavorite, favorites } = useFavorites();
  const movieId = parseInt(id as string);
  const [isFav, setIsFav] = useState(false);

  // Update isFav state when favorites changes
  useEffect(() => {
    setIsFav(isFavorite(movieId));
  }, [favorites, movieId, isFavorite]);

  // Reconstruct movie object for saving
  const currentMovie: Movie = {
    id: movieId,
    title: title as string,
    original_title: title as string,
    backdrop_path: backdrop_path as string,
    poster_path: backdrop_path as string,
    overview: overview as string,
    release_date: date as string,
    genre_ids: (generate_ids as string).split(",").map(Number),
  } as Movie;

   //Animation toast
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSaveMovie = async () => {
    console.log("Save clicked - currentMovie id:", currentMovie.id);
    if (isNaN(movieId)) {
      console.log("Error: movieId is NaN - id param:", id);
      return;
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    await addFavorite(currentMovie);
    console.log("Movie saved");
    Toast.show({
      type: isFav ? 'info' : 'success',
      position: 'top',
      text1: isFav ? 'Removed from favourites' : 'Added to favourites',
      text2: `Movie: ${title}`,
      visibilityTime: 2000,
    })
  };

  const params = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: 3,
    sort_by: "popularity.desc",
  };

  const { data } = useFetch("/discover/movie", params);
  const similarMovies: Movie[] = data?.results;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.overview}>
          <Image
            style={styles.overviewImage}
            source={backdrop_image ? { uri: backdrop_image } : default_image}
          />

          <SafeAreaView style={styles.cover}>
            <View style={{ flex: 1, paddingHorizontal: 14 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backbtnwrapper}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={26} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={["transparent", Colors.background]}
              style={styles.blur}
            >
              <Text
                numberOfLines={1}
                style={{ fontSize: 26, fontWeight: "600", color: Colors.text }}
              >
                {title}
              </Text>

              <Text style={{ color: Colors.gray }}>
                {`${yearReleased} | ${getGenreString(generate_ids.split(",") || [])}`}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="star" size={16} color={"#FF891B"} />
                <Text
                  style={{ color: "#FF891B", fontWeight: "600", marginLeft: 6 }}
                >
                  {Math.round(rating*10)/10}
                </Text>
              </View>
            </LinearGradient>
          </SafeAreaView>
        </View>

        <View style={{ padding: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppButton
              title="Watch now"
              style={{ backgroundColor: Colors.primary }}
              icon={<FontAwesome5 name="play" size={16} color={Colors.text} />}
            />

            <AppButton
              title="Download"
              icon={<Feather name="download" size={16} color={Colors.text} />}
            />
          </View>

          <View style={styles.btnwrapper}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ alignItems: "center" }}
                onPress={handleSaveMovie}
              >
                <MaterialCommunityIcons
                  name={isFav ? "bookmark" : "bookmark-outline"}
                  size={18}
                  color={isFav ? Colors.icon : Colors.text}
                  fill={isFav ? Colors.icon : "none"}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: isFav ? Colors.icon : Colors.text,
                  }}
                >
                  {isFav ? "Saved" : "Save"}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={{ alignItems: "center", marginLeft: 18 }}
            >
              <Ionicons
                name="paper-plane-outline"
                size={16}
                color={Colors.text}
              />
              <Text style={{ fontSize: 10, color: Colors.text }}>Share</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{ color: Colors.primary, fontWeight: "600", fontSize: 12 }}
            >
              Overview
            </Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontSize: 12 }}>
              {overview}
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <SectionHeader title="Trending now 🔥" />
          <FlatList
            data={similarMovies || []}
            renderItem={({ item, index }) => (
              <AnimatedMovieCard movie={item} itemIndex={index} />
            )}
            horizontal
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "space-between",
  },
  backbtnwrapper: {
    height: 40,
    width: 40,
    backgroundColor: "#202020",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  blur: {
    height: 120,
    width: "100%",
    padding: 14,
    justifyContent: "space-between",
  },
  btnwrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
});
