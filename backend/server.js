const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://DivyaDarshini:Darshini241@cluster0.7yrxrx8.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Book Schema
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

const Book = mongoose.model("Book", BookSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("DIVYA TEST");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

// Sample Book Route
app.get("/addsample", async (req, res) => {
  try {
    const sampleBook = new Book({
      title: "React JS",
      author: "Divya",
      price: 499,
    });

    await sampleBook.save();

    res.send("Sample Book Added Successfully");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "bookstoresecret"
    );

    res.json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Get Books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Add Book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete Book
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.json({
      message: "Book Deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
console.log("SERVER FILE LOADED");
// Server
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});