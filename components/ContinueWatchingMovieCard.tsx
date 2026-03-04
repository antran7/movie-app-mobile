import {
  DimensionValue,
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
import { FontAwesome5 } from "@expo/vector-icons";
import { Movie } from "@/app/types";
import { TMDB_IMAGE_BASE_PATH } from "@/hooks/useFetch";
import { default_image } from "@/app/utils/assets";
import { getGenreString } from "@/app/utils/genres";


const ContinueWatchingMovieCard = ({ movie }: { movie: Movie }) => {
  const getRandomPercentage = (): DimensionValue => {
    const min = 10;
    const max = 100;
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${value}%`;
  };

  const randomPercentage = getRandomPercentage();
  const tmdb_image_path = movie ? `${TMDB_IMAGE_BASE_PATH}${movie?.backdrop_path}` : null;

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <TouchableOpacity activeOpacity={0.8} style={styles.pressplay}>
          <View style={styles.playbtn}>
            <FontAwesome5 name="play" size={24} color={"#202020"} />
          </View>
        </TouchableOpacity>

        <Image source={tmdb_image_path ? { uri: tmdb_image_path } : default_image} style={styles.image} />

        <View style={styles.progressbarcontainer}>
          <View style={[styles.progress, { width: randomPercentage }]} />
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        <Text
          numberOfLines={1}
          style={{ color: Colors.text, fontWeight: "600", fontSize: 16 }}
        >
          {movie?.original_title || movie.original_name}
        </Text>

        <Text numberOfLines={1} style={{ color: Colors.gray, fontSize: 12 }}>
          {getGenreString(movie?.genre_ids || [])}
        </Text>
      </View>
    </View>
  );
};

export default ContinueWatchingMovieCard;

const styles = StyleSheet.create({
  container: {
    width: hs(240),
    marginHorizontal: 8,
  },
  image: {
    height: vs(170),
    width: "100%",
    borderRadius: 6,
  },
  pressplay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  progressbarcontainer: {
    marginTop: 8,
    height: 3,
    width: "100%",
    backgroundColor: Colors.text,
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  playbtn: {
    height: 60,
    width: 60,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.text,
  }
});
