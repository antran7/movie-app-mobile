import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "@/app/types";

const FAVORITES_KEY = "@movie_app_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites t? AsyncStorage
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      if (data) {
        setFavorites(JSON.parse(data));
      }
      setLoading(false);
    } catch (error) {
      console.log("Error loading favorites:", error);
      setLoading(false);
    }
  };

  // Th�m ho?c x�a phim t? favorites
  const addFavorite = async (movie: Movie) => {
    try {
      console.log("addFavorite called with movie id:", movie.id);
      const isFav = favorites.some((fav) => fav.id === movie.id);
      let updatedFavorites: Movie[];

      if (isFav) {
        console.log("Removing movie from favorites");
        updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      } else {
        console.log("Adding movie to favorites");
        updatedFavorites = [...favorites, movie];
      }

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      console.log("Favorites updated, new count:", updatedFavorites.length);
    } catch (error) {
      console.log("Error adding favorite:", error);
    }
  };

  // Ki?m tra xem phim c� trong favorites kh�ng
  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return { favorites, loading, addFavorite, isFavorite, loadFavorites };
}
