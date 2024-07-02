import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface InProgressItemProps {
  item: {
    volumeInfo?: {
      title: string;
      imageLinks?: { thumbnail: string };
      averageRating?: number;
    };
    poster_path?: string;
    title?: string;
    name?: string;
    vote_average?: number;
  };
}

const InProgressItem: React.FC<InProgressItemProps> = ({ item }) => {
  const isBook = item.volumeInfo !== undefined;
  const isMovie = item.title !== undefined;
  const isTVShow = item.name !== undefined;

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: isBook
            ? item.volumeInfo?.imageLinks?.thumbnail
            : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.cover}
      />
      <Text style={styles.title}>
        {isBook ? item.volumeInfo?.title : isMovie ? item.title : item.name}
      </Text>
      <Text style={styles.rating}>
        ⭐️ {isBook ? item.volumeInfo?.averageRating : item.vote_average}/5
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#888",
  },
});

export default InProgressItem;
