import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Keyboard,
} from "react-native";

import { connect } from "react-redux";

import FilmListItem from "./FilmListItem";
import DisplayError from "./DisplayError";

import Colors from "../definitions/Colors";

import { getFilmById, getFilmByName } from "../api/tmdb";

const SearchWatched = ({ navigation, favFilms }) => {
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [filmsFavoris, setFilmsFavoris] = useState([])

    useEffect(() => {
      (async () => {
        try {
          setIsEmpty(true);
          setIsError(false);
          setFilmsFavoris(await Promise.all(
            favFilms.map(async (id) => await getFilmById(id))
          ));
  
          if (filmsFavoris.lenght > 0) {
            console.log(vide);
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        }
      })();
    }, []);

  const searchFilms = (name = "") => {
    Keyboard.dismiss();
    requestFilms([], 1, name);
  };

  const navigateToFilmDetails = (filmId) => {
    navigation.navigate("ViewFilm", { filmId });
  };

  const amIaFavFilm = (filmId) => {
    return favFilms.findIndex((i) => i === filmId) !== -1;
  };

  const cancelSearch = () => {
    setSearchTerm("");
    searchFilms();
  }

  return (
    <View style={styles.container}>
    {isEmpty ? (
      <DisplayError message="Aucun favoris" />
    ) : isError ? (
      <DisplayError message="Impossible de récupérer les films" />
    ) : (
      <FlatList
          data={filmsFavoris}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmListItem
              filmData={item}
              onClick={() => navigateToFilmDetails(item.id)}
              isFav={amIaFavFilm(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favFilms: state.favFilmsID,
  };
};

export default connect(mapStateToProps)(SearchWatched);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
  serachInput: {
    flexDirection: 'row'
  },
});
