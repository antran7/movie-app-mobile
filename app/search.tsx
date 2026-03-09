import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Movie } from "./types";
import AnimatedMovieCard from "@/components/AnimatedMovieCard";
import debounce from "lodash.debounce";
import { useFetch } from "@/hooks/useFetch";

const SearchScreen = () => {
  const router = useRouter();
  const [results, setResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { data, loading } = useFetch("/search/movie", {
    query: activeSearchQuery,
    include_adult: false,
    language: "en-US",
    page: 1,
  });

  useEffect(() => {
    if (data?.results) {
      setResults(data.results);
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setHasSearched(false);
      setResults([]);
    }
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        setActiveSearchQuery(value);
        setHasSearched(true);
      }
    }, 400),
    [],
  );

  const handleTextChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setActiveSearchQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
      <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <KeyboardAvoidingView style={styles.searchInputWrapper}>
          <Feather
            name="search"
            size={20}
            color={Colors.gray}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search movies..."
            placeholderTextColor={Colors.gray}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleTextChange}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Feather name="x" size={20} color={Colors.gray} />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Results or Placeholder */}
      {!hasSearched ? (
        <View style={styles.placeholderContainer}>
          <Feather name="search" size={64} color={Colors.gray} />
          <Text style={styles.placeholderTitle}>Search for Movies</Text>
          <Text style={styles.placeholderSubtitle}>
            Enter a movie title to see search results
          </Text>
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Feather name="inbox" size={64} color={Colors.gray} />
          <Text style={styles.placeholderTitle}>No Results Found</Text>
          <Text style={styles.placeholderSubtitle}>
            Try searching with a different query
          </Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Results</Text>
              <Text style={styles.resultsCount}>{results.length} found</Text>
            </View>
          }
          data={results}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} itemIndex={index} />
          )}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: Colors.text,
    fontSize: 16,
  },
  cancelBtn: {
    padding: 8,
  },
  cancelText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  placeholderTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  placeholderSubtitle: {
    color: Colors.gray,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    color: Colors.text,
    fontSize: 16,
    marginTop: 16,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultsTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  resultsCount: {
    color: Colors.gray,
    fontSize: 14,
    marginTop: 4,
  },
});
