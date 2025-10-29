import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();

      if (!data.items) {
        setError("No books found for your search.");
        setLoading(false);
        return;
      }

      setBooks(data.items);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="book-box">
        <h1>📚 Book Finder</h1>
        <p className="subtitle">Discover books by title, author, or topic</p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={searchBooks}
          loading={loading}
        />

        {loading && <p className="loading">Loading books...</p>}
        {error && <p className="error">{error}</p>}
        <BookList books={books} />
      </div>
    </div>
  );
}
