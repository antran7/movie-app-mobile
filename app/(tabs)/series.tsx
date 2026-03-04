import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import FilterItem from "@/components/FilterItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { movies } from "@/mock-data";
import MovieCard from "@/components/MovieCard";
import { useFetch } from "@/hooks/useFetch";
import { Movie } from "../types";

const SeriesScreen = () => {
  const [page, setPage] = useState(1);
  const params = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    sort_by: "popularity.desc",
  };

  const { data, loading } = useFetch("/discover/tv", params);
  const series: Movie[] = data?.results;
  const handleRefresh = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPage(randomPage);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterItem title="Category" />
          <FilterItem title="Region" />
          <FilterItem title="Release Year" />
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={series}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[Colors.gray]}
              tintColor={Colors.gray}
            />
          }
        />
      </View>
    </View>
  );
};

export default SeriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
