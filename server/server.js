const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const TMDB_API_KEY = "573ede485fbba2b292c6ad3c5daffbac";
const GOOGLE_BOOKS_API_KEY = "AIzaSyB4RFB_VSZuR_fXwkwq15UcROQZ-oi6xR0";

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourdatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String,
});

const User = mongoose.model("User", userSchema);

// Registration Endpoint
app.post("/register", async (req, res) => {
  const { username, password, profilePicture } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, profilePicture });
  await user.save();

  res.status(201).send("User registered");
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

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
