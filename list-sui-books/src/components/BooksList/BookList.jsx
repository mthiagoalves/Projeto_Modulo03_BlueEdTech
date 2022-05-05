import React, { useState, useEffect, useCallback } from "react";
import { ActionMode } from "constants/index";
import BookListItem from "components/BookListItem/BookListItem";
import { BookServices } from "services/BookServices";
import BookDetailsModal from "components/BookDeitals/details";

import "./BookList.css";

function BookList({ bookCreated, mode, updateBook, deleteBook, bookEdited }) {
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

  const getById = async (bookId) => {
    const response = await BookServices.getById(bookId);

    console.log(response);
    const mapper = {
      [ActionMode.NORMAL]: () => setBookModal(response),
      [ActionMode.UPDATE]: () => updateBook(response),
      [ActionMode.DELET]: () => deleteBook(response),
    };
    mapper[mode]();
  };

  useEffect(() => {
    getList();
  }, [bookEdited]);

  const addBookToList = useCallback(
    (book) => {
      const list = [...books, book];
      setBooks(list);
    },
    [books]
  );

  useEffect(() => {
    if (bookCreated && !books.map(({ id }) => id).includes(bookCreated.id)) {
      addBookToList(bookCreated);
    }
  }, [addBookToList, bookCreated, books]);

  return (
    <div className="book-list">
      {books.map((books, index) => (
        <BookListItem
          mode={mode}
          key={`book-list-item-${index}`}
          book={books}
          qtdSelected={selectBook[index]}
          index={index}
          onAdd={(index) => addItem(index)}
          onRemove={(index) => removeItem(index)}
          clickItem={(booksId) => getById(booksId)}
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
