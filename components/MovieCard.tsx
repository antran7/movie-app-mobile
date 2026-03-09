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
import { TMDB_IMAGE_BASE_PATH } from "@/hooks/useFetch";
import { Movie } from "@/app/types";
import { default_image } from "@/app/utils/assets";
import { getGenreString } from "@/app/utils/genres";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const tmdb_image_path = movie
    ? `${TMDB_IMAGE_BASE_PATH}${movie?.poster_path}`
    : null;

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: "/details",
        params: {
          id: movie?.id,
          title: movie?.original_title || movie?.original_name,
          backdrop_path: movie?.backdrop_path,
          date: movie?.release_date,
          generate_ids: movie?.genre_ids,
          overview: movie?.overview,
          rating: movie?.vote_average,
        }
      })}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={tmdb_image_path ? { uri: tmdb_image_path } : default_image}
      />

      <View>
        <Text
          numberOfLines={1}
          style={{ color: Colors.text, fontWeight: "600", fontSize: ms(14) }}
        >
          {movie?.original_title || movie?.original_name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: Colors.gray, fontSize: ms(10) }}
        >
          {getGenreString(movie?.genre_ids || [])}
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
