import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

const usePreferiti = () => {
  const [preferiti, setPreferiti] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  const caricaPreferiti = useCallback(async () => {
    try {
      setLoading(true);
      const saved = await AsyncStorage.getItem("preferiti");
      if (saved) {
        setPreferiti(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Errore nel caricamento preferiti", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View>
      <Text>usePreferiti</Text>
    </View>
  );
};

export default usePreferiti;

const styles = StyleSheet.create({});
