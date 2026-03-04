import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/colors'
import FilterItem from '@/components/FilterItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { movies } from '@/mock-data';
import MovieCard from '@/components/MovieCard';

const SeriesScreen = () => {
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

      <FlatList
        data={[...movies].reverse()}
        renderItem={({ item }) => (
          <MovieCard genre={item.genre} title={item.title} image={item.image} />
        )}
        numColumns={3}
      />
    </View>
  );
}

export default SeriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  }
})