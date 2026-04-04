import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePreferiti from "../hooks/usePreferiti";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
}

export default function Index() {
  const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  const [film, setFilm] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  const { isPreferito, togglePreferito } = usePreferiti();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=it-IT&page=1`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Film caricati:", data.results?.length);
        setFilm(data.results || []);
        setLoading(false);
      })
      .catch((errore) => {
        console.error("Errore:", errore);
        setLoading(false);
      });
  }, []);
  const goToDettaglio = (movieId: number) => {
    router.push(`/details?id=${movieId}`);
  };

  const handlePreferito = async (film: Film, event: any) => {
    event.stopPropagation();
    const aggiunto = await togglePreferito(film);
    Alert.alert(
      aggiunto ? "✅ Aggiunto!" : "❌ Rimosso!",
      aggiunto
        ? `${film.title} è stato aggiunto ai preferiti`
        : `${film.title} è stato rimosso dai preferiti`,
    );
  };

  const renderCard = ({ item }: { item: Film }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => goToDettaglio(item.id)}
      activeOpacity={0.9}
    >
      <View style={styles.posterContainer}>
        {item.poster_path ? (
          <Image
            source={{ uri: `${IMAGE_BASE}${item.poster_path}` }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>🎬</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ⭐ {item.vote_average?.toFixed(1)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => handlePreferito(item, e)}
        >
          <Text style={styles.favoriteIcon}>
            {isPreferito(item.id) ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.year}>
          {item.release_date?.split("-")[0] || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Caricamento...</Text>
      </View>
    );
  }

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=it-IT&page=1`,
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // 🔍 QUESTI console.log ti svelano TUTTA la struttura!
  //       console.log("📦 RISPOSTA COMPLETA:", data);
  //       console.log("🎬 ARRAY DEI FILM (results):", data.results);
  //       console.log("🍿 PRIMO FILM:", data.results?.[0]);
  //       console.log(
  //         "📝 CHIAVI del primo film:",
  //         data.results?.[0] ? Object.keys(data.results[0]) : "nessun film",
  //       );

  //       setFilm(data.results || []);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Popolari</Text>
        <Text style={styles.headerSubtitle}>I film più amati del momento</Text>
      </View>

      <FlatList
        data={film}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f1a",
  },
  loadingText: {
    marginTop: 12,
    color: "#a1a1aa",
    fontSize: 14,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#0f0f1a",
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#a1a1aa",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#1c1c24",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    height: CARD_WIDTH * 1.5,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  noPoster: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2a35",
    justifyContent: "center",
    alignItems: "center",
  },
  noPosterText: {
    fontSize: 48,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  favoriteButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 8,
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteIcon: {
    fontSize: 20,
  },

  ratingText: {
    color: "#fbbf24",
    fontSize: 12,
    fontWeight: "600",
  },
  infoContainer: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    lineHeight: 18,
  },
  year: {
    fontSize: 12,
    color: "#a1a1aa",
  },
});
