import React, { useState } from "react";
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

  return (
    <View>
      <Text>usePreferiti</Text>
    </View>
  );
};

export default usePreferiti;

const styles = StyleSheet.create({});
