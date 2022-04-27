import React, { useState } from "react";
import { books } from "../../mocks/books";
import "./BookList.css";

function BookList() {
  const [selectBook, setSelectBook] = useState({});

  const addItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) + 1 };
    setSelectBook({ ...selectBook, ...book });
  };

  const removeItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) - 1 };
    setSelectBook({ ...selectBook, ...book });
  };

  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="book-list-item-badge">{selectBook[index]}</span>
    );

  const btnRemove = (canRender, index) =>
    Boolean(canRender) && (
      <button className="add-remove" onClick={() => removeItem(index)}>
        {" "}
        Remove to cart{" "}
      </button>
    );
  return (
    <div className="book-list">
      {books.map((books, index) => (
        <div className="book-list-item" key={`book-list-item-${index}`}>
          {badgeCounter(selectBook[index], index)}
          <div className="book-container">
            <div className="book-title">{books.title}</div>
            <div className="book-price">$ {books.price}</div>
            <div className="book-author">{books.author}</div>
            <div className="btn-actions action">
              <button
                className={`add-cart ${!selectBook[index] && "add-cart-pre"}`}
                onClick={() => addItem(index)}
              >
                Add to cart
              </button>
              {btnRemove(selectBook[index], index)}
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
