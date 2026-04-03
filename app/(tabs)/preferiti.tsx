import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

export default function preferiti() {
  const [preferiti, setPreferiti] = useState([]);

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
      <Text>preferiti</Text>
    </View>
  );
}
