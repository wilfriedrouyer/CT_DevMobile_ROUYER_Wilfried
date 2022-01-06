import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';

import DisplayError from "./DisplayError";

import { getFilmById, getCasting, favFilms } from "../api/tmdb";

import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";

const Film = ({ route, favFilms, dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState(null);
  const [isError, setIsError] = useState(false);
  const [listCast, setListCast] = useState([]);

  useEffect(() => {
    requestFilm();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestFilm = async () => {
    try {
      const tmdbFilmResult = await getFilmById(route.params.filmId);
      setFilm(tmdbFilmResult);
      const castResult = await getCasting(route.params.filmId);
      setListCast(castResult);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  // On pourrait définir les actions dans un fichier à part
  const saveFilm = async () => {
    const action = { type: "SAVE_FILM", value: route.params.filmId };
    dispatch(action);
    let toast = Toast.show(`Film ajouté aux favoris`, {
      duration: Toast.durations.LONG,
    });
    console.log(favFilms);
  };
  const unsaveFilm = async () => {
    const action = { type: "UNSAVE_FILM", value: route.params.filmId };
    dispatch(action);
    let toast = Toast.show(`Film retiré des favoris`, {
      duration: Toast.durations.LONG,
    });
  };

  const getGenre = () => {
    let genre = "";
    film.genres.forEach((genreIndex) => {
      if (genre !== "") genre = genre + ", " + genreIndex.name;
      else genre = genreIndex.name;
    });
    return genre;
  };

  const getCast = () => {
    let cast = "";
    if (listCast.length !== 0) {
      listCast.cast.forEach((person) => {
        if (cast !== "") cast = cast + ", " + person.name;
        else cast = person.name;
      });
    }
    return cast;
  };

  const displaySaveFilm = () => {
    if (favFilms.findIndex(i => i === route.params.filmId) !== -1) {
      // Le restaurant est sauvegardé
      return (
        <Button
          title="Retirer des favoris"
          color={Colors.mainGreen}
          onPress={unsaveFilm}
        />
      );
    }
    // Le restaurant n'est pas sauvegardé
    return (
      <Button
        title="Ajouter aux favoris"
        color={Colors.mainGreen}
        onPress={saveFilm}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les données du film" />
      ) : isLoading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.containerScroll}>
          <View style={styles.containerCardTop}>
            <View style={styles.containerEstab}>
              <Text style={styles.textName}>{film.original_title}</Text>

              <Text style={styles.textContent}>
                Release : {film.release_date}
              </Text>
              <Text style={styles.textContent}>Genre : {getGenre()}</Text>
              <Text style={styles.textContent}>
                Runtime : {film.runtime}min
              </Text>
            </View>
            <View style={styles.containerEstab}>
              <Text style={styles.textName}>Cast</Text>
              <Text style={styles.textContent}>{getCast()}</Text>
            </View>
            <View style={styles.containerEstab}>
              <Text style={styles.textName}>Overview</Text>
              <Text style={styles.textContent}>{film.overview}</Text>
            </View>
            {displaySaveFilm()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
    return {
      favFilms: state.favFilmsID
    }
  }
  
  export default connect(mapStateToProps)(Film);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: "column",
    backgroundColor: "white",
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: "white",
  },
  containerNoRestaurantImage: {
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "white",
  },
  restaurantImage: {
    height: 180,
    backgroundColor: Colors.mainGreen,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textNote: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: "white",
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textTitle: {
    fontWeight: "bold",
    color: Colors.mainGreen,
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});
