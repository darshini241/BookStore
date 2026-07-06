import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async () => {
    if (!title || !author || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          price,
        }),
      });

      if (response.ok) {
        alert("Book Added Successfully");
        setTitle("");
        setAuthor("");
        setPrice("");
        fetchBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
      });

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (book) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(book);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Book Added To Cart");
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>📚Welcome to Book Store Management</h1>
      

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "80%",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", width: "220px" }}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: "10px", width: "220px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", width: "220px" }}
        />

        <button
          onClick={addBook}
          style={{
            padding: "10px 20px",
            background: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Book
        </button>
      </div>

      <br />

      <input
        type="text"
        placeholder="🔍 Search Books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
        }}
      />

      <h2>Total Books Found: {filteredBooks.length}</h2>

      <button
        onClick={() => navigate("/cart")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Go To Cart
      </button>

      <div>
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            style={{
              width: "400px",
              margin: "15px auto",
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ₹{book.price}</p>

            <button
              onClick={() => addToCart(book)}
              style={{
                marginRight: "10px",
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => deleteBook(book._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;