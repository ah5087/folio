const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;

const TMDB_API_KEY = "573ede485fbba2b292c6ad3c5daffbac";
const GOOGLE_BOOKS_API_KEY = "AIzaSyB4RFB_VSZuR_fXwkwq15UcROQZ-oi6xR0";

// Middleware
app.use(bodyParser.json());

// Fetch Books
app.get("/books", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${GOOGLE_BOOKS_API_KEY}`
    );
    res.send(data.items);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch books" });
  }
});

// Fetch Movies
app.get("/movies", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
    );
    res.send(data.results);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch movies" });
  }
});

// Fetch TV Shows
app.get("/tvshows", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`
    );
    res.send(data.results);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch TV shows" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
