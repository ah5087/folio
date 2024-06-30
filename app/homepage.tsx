import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import ProfileCircle from "../assets/images/profile-circle-svgrepo-com.svg";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    averageRating?: number;
  };
}

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface TVShow {
  id: string;
  name: string;
  poster_path: string;
  vote_average: number;
}

const Homepage = () => {
  const router = useRouter();
  const [inProgressItems, setInProgressItems] = useState<
    (Book | Movie | TVShow)[]
  >([]);
  const [myShelfItems, setMyShelfItems] = useState<(Book | Movie | TVShow)[]>(
    []
  );
  const [filter, setFilter] = useState("all");
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = await fetch("http://localhost:3000/user");
      const data = await user.json();
      setProfilePicture(data.profilePicture);
    };

    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/books");
      const data: Book[] = await response.json();
      setInProgressItems((prev) => [...prev, ...data.slice(0, 2)]);
      setMyShelfItems((prev) => [...prev, ...data]);
    };

    const fetchMovies = async () => {
      const response = await fetch("http://localhost:3000/movies");
      const data: Movie[] = await response.json();
      setInProgressItems((prev) => [...prev, ...data.slice(0, 2)]);
      setMyShelfItems((prev) => [...prev, ...data]);
    };

    const fetchTVShows = async () => {
      const response = await fetch("http://localhost:3000/tvshows");
      const data: TVShow[] = await response.json();
      setInProgressItems((prev) => [...prev, ...data.slice(0, 2)]);
      setMyShelfItems((prev) => [...prev, ...data]);
    };

    fetchProfilePicture();
    fetchBooks();
    fetchMovies();
    fetchTVShows();
  }, []);

  const isBook = (item: Book | Movie | TVShow): item is Book => {
    return (item as Book).volumeInfo !== undefined;
  };

  const isMovie = (item: Book | Movie | TVShow): item is Movie => {
    return (item as Movie).title !== undefined;
  };

  const isTVShow = (item: Book | Movie | TVShow): item is TVShow => {
    return (item as TVShow).name !== undefined;
  };

  const filteredShelfItems = myShelfItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "books" && isBook(item)) return true;
    if (filter === "movies" && isMovie(item)) return true;
    if (filter === "tv" && isTVShow(item)) return true;
    return false;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>hello, alice!</Text>
        <TouchableOpacity style={styles.profileButton}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <ProfileCircle width={40} height={40} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>in progress</Text>
        <ScrollView horizontal contentContainerStyle={styles.progressContainer}>
          {inProgressItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{
                  uri: isBook(item)
                    ? item.volumeInfo.imageLinks?.thumbnail
                    : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.cover}
              />
              <Text style={styles.title}>
                {isBook(item)
                  ? item.volumeInfo.title
                  : isMovie(item)
                  ? item.title
                  : item.name}
              </Text>
              <Text style={styles.rating}>
                ⭐️{" "}
                {isBook(item)
                  ? item.volumeInfo.averageRating
                  : item.vote_average}
                /5
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>my shelf</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <Text
            style={[styles.filter, filter === "all" && styles.activeFilter]}
            onPress={() => setFilter("all")}
          >
            all
          </Text>
          <Text
            style={[styles.filter, filter === "books" && styles.activeFilter]}
            onPress={() => setFilter("books")}
          >
            books
          </Text>
          <Text
            style={[styles.filter, filter === "movies" && styles.activeFilter]}
            onPress={() => setFilter("movies")}
          >
            movies
          </Text>
          <Text
            style={[styles.filter, filter === "tv" && styles.activeFilter]}
            onPress={() => setFilter("tv")}
          >
            tv
          </Text>
        </View>
        <View style={styles.shelfContainer}>
          {filteredShelfItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{
                  uri: isBook(item)
                    ? item.volumeInfo.imageLinks?.thumbnail
                    : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.cover}
              />
              <Text style={styles.title}>
                {isBook(item)
                  ? item.volumeInfo.title
                  : isMovie(item)
                  ? item.title
                  : item.name}
              </Text>
              <Text style={styles.rating}>
                ⭐️{" "}
                {isBook(item)
                  ? item.volumeInfo.averageRating
                  : item.vote_average}
                /5
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
  },
  card: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    padding: 10,
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
  progressBar: {
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "#6200ee",
  },
  rating: {
    fontSize: 14,
    color: "#888",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ee",
  },
  activeFilter: {
    textDecorationLine: "underline",
  },
  shelfContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Homepage;
