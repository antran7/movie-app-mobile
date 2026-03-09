import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import MovieCard from "./MovieCard";
import { Movie } from "@/app/types";

interface AnimatedMovieCardProps {
  movie: Movie;
  itemIndex: number;
}

export default function AnimatedMovieCard({ movie, itemIndex }: AnimatedMovieCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(itemIndex * 100)
        .duration(500)
        .springify()}
    >
      <MovieCard movie={movie} />
    </Animated.View>
  );
}
