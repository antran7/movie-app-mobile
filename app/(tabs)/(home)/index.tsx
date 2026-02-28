import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import OverViewSection from "@/components/OverViewSection";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/mock-data";
import ContinueWatchingMovieCard from "@/components/ContinueWatchingMovieCard";
import SectionHeader from "@/components/SectionHeader";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <OverViewSection />

        <View style={{ marginVertical: 20 }}>
          <SectionHeader title="Trending now 🔥" />
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard
                genre={item.genre}
                title={item.title}
                image={item.image}
              />
            )}
            horizontal
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <SectionHeader title="Continue watching" />
          <FlatList
            data={[...movies].reverse()}
            renderItem={({ item }) => (
              <ContinueWatchingMovieCard
                genre={item.genre}
                title={item.title}
                image={item.image}
              />
            )}
            horizontal
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <SectionHeader title="New Releases 🚀" />
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard
                genre={item.genre}
                title={item.title}
                image={item.image}
              />
            )}
            horizontal
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <SectionHeader title="International Picks 🚀" />
          <FlatList
            data={[...movies].reverse()}
            renderItem={({ item }) => (
              <MovieCard
                genre={item.genre}
                title={item.title}
                image={item.image}
              />
            )}
            horizontal
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
