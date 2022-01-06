import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Assets from "../definitions/Assets";
import Colors from "../definitions/Colors";

const Liste = ({ onClick, filmData, isFav = false }) => {
  const getImage = () => {
    if (filmData.poster_path) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: "https://image.tmdb.org/t/p/original" + filmData.poster_path,
          }}
        />
      );
    }
    return (
      <View style={styles.noImageContainer}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onClick(filmData.id);
      }}
    >
      {getImage()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filmData.original_title}</Text>
          {isFav ? (
            <Image
              style={[styles.icon, { marginLeft: "auto" }]}
              source={Assets.icons.favFull}
            />
          ) : null}
        </View>
        <Text style={[styles.data, styles.release_date]} numberOfLines={1}>
          {filmData.release_date}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Image style={styles.icon} source={Assets.icons.rate} />
            <Text style={[styles.data, styles.stat]}>
              {filmData.vote_average}
            </Text>
          </View>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={[styles.data, styles.stat]}>{filmData.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Liste;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  overviewContainer: {
    flexDirection: "row",
  },
  statContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  noImageContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
  },
  release_date: {
    fontStyle: "italic",
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});
