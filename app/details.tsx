import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "@/components/AppButton";
import SectionHeader from "@/components/SectionHeader";
import { movies } from "@/mock-data";
import MovieCard from "@/components/MovieCard";

const DetailsScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.overview}>
          <Image
            style={styles.overviewImage}
            source={require("@/assets/images/overview.png")}
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
                The Sandman
              </Text>

              <Text style={{ color: Colors.gray }}>
                2025 | Monster Horror | Sci-fi Epic
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="star" size={16} color={"#FF891B"} />
                <Text
                  style={{ color: "#FF891B", fontWeight: "600", marginLeft: 6 }}
                >
                  9.5
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
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ alignItems: "center" }}
            >
              <Feather name="bookmark" size={16} color={Colors.text} />
              <Text style={{ fontSize: 10, color: Colors.text }}>Save</Text>
            </TouchableOpacity>

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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              laudantium sequi ea facere officiis vel dignissimos atque rem
              molestias. Adipisci consequatur impedit fuga enim odio ex quas ut
              eos recusandae.
            </Text>
          </View>
        </View>

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
