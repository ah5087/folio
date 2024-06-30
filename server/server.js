const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());

// connect to MongoDB Atlas
const uri =
  "mongodb+srv://alice:ZipgbkVVGT1Ibqwr@folio-app.mwg2gz2.mongodb.net/yourdatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  res.status(201).send("User registered");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
