import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

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

export default function preferiti() {
  const [preferiti, setPreferiti] = useState<Film[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPreferiti;
    }, []),
  );

  const loadPreferiti = async () => {
    const filmSalvato = await AsyncStorage.getItem("preferiti");
    if (filmSalvato) setPreferiti(JSON.parse(filmSalvato));
  };

  if (preferiti.length === 0) {
    return (
      <View>
        <Text>❤️ Nessun preferito</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={preferiti}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/details?id=${item.id}`)}
          >
            <Image source={{ uri: `${IMAGE_BASE}${item.poster_path}` }} />
            <View>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
