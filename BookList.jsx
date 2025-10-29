

import React from "react";

export default function BookList({ books }) {
  if (books.length === 0) return null;

  return (
    <div className="book-list">
      {books.map((book) => {
        const info = book.volumeInfo;
        return (
          <div key={book.id} className="book-card">
            <img
              src={
                info.imageLinks?.thumbnail ||
                "https://via.placeholder.com/128x190?text=No+Image"
              }
              alt={info.title}
            />
            <h3>{info.title}</h3>
            <p>{info.authors ? info.authors.join(", ") : "Unknown Author"}</p>
            <a
              href={info.infoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </a>
          </div>
        );
      })}
    </div>
  );
}
