import React, { useState } from "react";
import { books } from "../mocks/books";
import "./BookList.css";

function BookList() {
  const [selectBook, setSelectBook] = useState({});

  const addItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) + 1 };
    setSelectBook({ ...selectBook, ...book });
  };
  return (
    <div className="book-list">
      {books.map((books, index) => (
        <div className="book-list-item" key={`book-list-item-${index}`}>
          <span className="book-list-item-badge">{selectBook[index] || 0}</span>
          <div className="book-container">
            <div className="book-title">{books.title}</div>
            <div className="book-genre">{books.genre}</div>
            <div className="book-author">{books.author}</div>
            <div className="btn-actions action">
              <button
                className="add-cart add-cart-pre"
                onClick={() => addItem(index)}
              >
                Add to cart
              </button>
            </div>
          </div>
          <img
            src={books.img}
            alt={`Book: ${books.title}`}
            className="book-img"
          />
        </div>
      ))}
    </div>
  );
}

export default BookList;
