import React, { useState } from "react";
import { Text, View } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

export default function ricerca() {
  // stati generali

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // funzione per cercare il film con gestione degli errori

  const searchFilm = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=it-IT`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>ricerca</Text>
    </View>
  );
}
