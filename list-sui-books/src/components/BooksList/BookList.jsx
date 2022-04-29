import React, { useState, useEffect } from "react";
import BookListItem from "components/BookListItem/BookListItem";
import { BookServices } from "services/BookServices";
import BookDetailsModal from "components/BookDeitals/details";

import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);

  const [selectBook, setSelectBook] = useState({});

  const [bookModal, setBookModal] = useState(false);

  const addItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) + 1 };
    setSelectBook({ ...selectBook, ...book });
  };

  const removeItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) - 1 };
    setSelectBook({ ...selectBook, ...book });
  };

  const getList = async () => {
    const response = await BookServices.getList();
    setBooks(response);
  };

  useEffect(() => {
    getList();
  }, []);

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
          clickItem={(booksId) => setBookModal(books)}
        />
      ))}
      {bookModal && (
        <BookDetailsModal
          books={bookModal}
          closeModal={() => setBookModal(false)}
        />
      )}
    </div>
  );
}

export default BookList;
