import React, { useState } from "react";
import BookListItem from "components/BookListItem/BookListItem";
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

  return (
    <div className="book-list">
      {books.map((books, index) => (
        <BookListItem
          key={`book-list-item-${index}`}
          book={books}
          qtdSelected={selectBook[index]}
          index={index}
          onAdd={(index) => addItem(index)}
          onRemove={(index) => removeItem(index)}
        />
      ))}
    </div>
  );
}

export default BookList;
