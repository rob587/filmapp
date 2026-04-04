import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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

  // check per vedere se c'è il film

  const isPreferito = useCallback(
    (filmId: number) => {
      return preferiti.some((f) => f.id === filmId);
    },
    [preferiti],
  );

  const aggiungiPreferiti = useCallback(
    async (film: Film) => {
      try {
        const esiste = preferiti.some((f) => f.id === film.id);
        if (!esiste) {
          const nuoviPreferiti = [...preferiti, film];
          setPreferiti(nuoviPreferiti);
          await AsyncStorage.setItem(
            "preferiti",
            JSON.stringify(nuoviPreferiti),
          );
          return true;
        }
        return false;
      } catch (error) {
        console.error("errore nell'aggiunta:", error);
        return false;
      }
    },
    [preferiti],
  );

  const rimuoviPreferiti = useCallback(
    async (filmId: number) => {
      try {
        const nuoviPreferiti = preferiti.filter((f) => f.id !== filmId);
        setPreferiti(nuoviPreferiti);
        await AsyncStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
        return true;
      } catch (error) {
        console.error("errore nella rimozione del film", error);
        return false;
      }
    },
    [preferiti],
  );

  const togglePreferito = useCallback(
    async (film: Film) => {
      if (isPreferito(film.id)) {
        await rimuoviPreferiti(film.id);
        return false;
      } else {
        await aggiungiPreferiti(film);
        return true;
      }
    },
    [isPreferito, aggiungiPreferiti, rimuoviPreferiti],
  );

  useFocusEffect(
    useCallback(() => {
      caricaPreferiti();
    }, [caricaPreferiti]),
  );

  return {
    preferiti,
    loading,
    isPreferito,
    aggiungiPreferiti,
    rimuoviPreferiti,
    togglePreferito,
    caricaPreferiti,
  };
};

export default usePreferiti;
