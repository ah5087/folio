import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import ProfileCircle from "../assets/images/profile-circle-svgrepo-com.svg";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import InProgressItem from "@/components/InProgressItem";
import ShelfItem from "@/components/ShelfItem";
import FilterButton from "@/components/FilterButton";

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
      <Header profilePicture={profilePicture} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>in progress</Text>
        <ScrollView horizontal contentContainerStyle={styles.progressContainer}>
          {inProgressItems.map((item, index) => (
            <InProgressItem key={index} item={item} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <SectionHeader
          title="my shelf"
          onAddPress={() => router.push("(search)/SearchPage")}
        />
        <View style={styles.filterContainer}>
          <FilterButton
            text="all"
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <FilterButton
            text="books"
            active={filter === "books"}
            onPress={() => setFilter("books")}
          />
          <FilterButton
            text="movies"
            active={filter === "movies"}
            onPress={() => setFilter("movies")}
          />
          <FilterButton
            text="tv"
            active={filter === "tv"}
            onPress={() => setFilter("tv")}
          />
        </View>
        <View style={styles.shelfContainer}>
          {filteredShelfItems.map((item, index) => (
            <ShelfItem key={index} item={item} />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  shelfContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Homepage;
