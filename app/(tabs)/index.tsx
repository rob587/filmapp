import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const [film, setFilm] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=it-IT&page=1`,
    )
      .then((res) => res.json())
      .then((data) => setFilm(data.results));
  }, []);

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
    <View style={styles.contenitore}>
      <Text>ciao.</Text>
      <FlatList
        data={film}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.overview}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenitore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
