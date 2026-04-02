Nome progetto: filmapp o come preferisci tu.
Struttura schermate:
app/
\_layout.tsx
dettaglio.tsx ← schermata film dettaglio
(tabs)/
\_layout.tsx
index.tsx ← tab Popolari
ricerca.tsx ← tab Ricerca
preferiti.tsx ← tab Preferiti
Cosa fa ogni schermata:

Popolari → lista film popolari da TMDB con poster, titolo e voto
Ricerca → TextInput per cercare film per nome, risultati in FlatList
Preferiti → film salvati con AsyncStorage, persistono alla chiusura
Dettaglio → poster grande, titolo, trama, voto, anno, bottone aggiungi/rimuovi preferiti
