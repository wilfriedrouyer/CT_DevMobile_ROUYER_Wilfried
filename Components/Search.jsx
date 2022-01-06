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

import { getFilms, getFilmByName } from "../api/tmdb";

const Search = ({ navigation, favFilms }) => {
  const [films, setFilms] = useState();
  const [nextPage, setNextPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isError, setIsError] = useState(false);

  const requestFilms = async (prevFilms, page, name) => {
    setIsError(false);
    try {
      if (name === "") {
        const tmdbSearchResult = await getFilms(searchTerm, page);
        setFilms([...prevFilms, ...tmdbSearchResult.results]);
      } else {
        const tmdbSearchResult = await getFilmByName(searchTerm, page, name);
        setFilms([]);
        setFilms([...prevFilms, ...tmdbSearchResult.results]);
      }
      if (nextPage < 1000) {
        setNextPage(nextPage + 1);
      }
    } catch (error) {
      setIsError(true);
      setFilms([]);
    }
  };

  useEffect(() => {
    searchFilms();
  }, []);

  const searchFilms = (name = "") => {
    Keyboard.dismiss();
    requestFilms([], 1, name);
  };

  const loadMoreFilms = () => {
    if (isMoreResults) {
      requestFilms(films, nextPage);
    }
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
      <View style={styles.searchContainer}>
        <View style={styles.serachInput}>
          <TextInput
            placeholder="Movie"
            value={searchTerm}
            style={[styles.inputFilmName, {flex: 4}]}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={(name) => searchFilms(name)}
          />

          <Button
            title="Cancel"
            color={Colors.mainGreen}
            onPress={cancelSearch}
            style={{flex: 1}}
          />
        </View>
        <Button
          title="Search"
          color={Colors.mainGreen}
          onPress={(name) => searchFilms(name)}
        />
      </View>
      {isError ? (
        <DisplayError message="Impossible de récupérer les films" />
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmListItem
              filmData={item}
              onClick={() => navigateToFilmDetails(item.id)}
              isFav={amIaFavFilm(item.id)}
            />
          )}
          onEndReached={loadMoreFilms}
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

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputFilmName: {
    marginBottom: 8,
  },
  serachInput: {
    flexDirection: 'row'
  },
});
