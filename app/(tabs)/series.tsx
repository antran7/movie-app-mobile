import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "@/constants/colors";
import FilterItem from "@/components/FilterItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetch } from "@/hooks/useFetch";
import { Movie } from "../types";
import AnimatedMovieCard from "@/components/AnimatedMovieCard";

const SeriesScreen = () => {
  const [page, setPage] = useState(1);
  const [allSeries, setAllSeries] = useState<Movie[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const params = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    sort_by: "popularity.desc",
  };

  const { data, loading } = useFetch("/discover/tv", params);

  // Merge data khi page thay đổi
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        // Trang đầu tiên, replace data
        setAllSeries(data.results);
      } else {
        // Trang tiếp theo, merge với data cũ
        setAllSeries((prev) => [...prev, ...data.results]);
      }
      setLoadingMore(false);
    }
  }, [data, page]);

  const handleRefresh = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPage(randomPage);
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    ) : null;
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
          data={allSeries}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} itemIndex={index} />
          )}
          numColumns={3}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={loading && page === 1}
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
  loader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});