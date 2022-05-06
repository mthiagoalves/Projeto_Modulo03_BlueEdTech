import React, { useState, useEffect, useCallback } from 'react';
import { ActionMode } from 'constants/index';
import BookListItem from 'components/BookListItem/BookListItem';
import { BookServices } from 'services/BookServices';
import BookDetailsModal from 'components/BookDeitals/details';
import { matchByText } from 'helpers/utils';

import './BookList.css';

function BookList({
  bookCreated,
  mode,
  updateBook,
  deleteBook,
  bookEdited,
  bookDeleted,
}) {
  const selected = JSON.parse(localStorage.getItem('selected')) ?? {}; //Seleciona e armazena o item selecionado no local storage

  const [books, setBooks] = useState([]);

  const [bookFilter, setBookFilter] = useState([]);

  const [selectBook, setSelectBook] = useState(selected);

  const [bookModal, setBookModal] = useState(false);

  const addItem = (bookIndex) => {
    const book = { [bookIndex]: Number(selectBook[bookIndex] || 0) + 1 };
    setSelectBook({ ...selectBook, ...book });
  };

  const setSelected = useCallback(() => {
    if (!books.length) return;

    const entries = Object.entries(selectBook);
    const bag = entries.map((arr) => ({
      bookId: books[arr[0]].id,
      qtdSelected: arr[1],
    }));
    localStorage.setItem('bag', JSON.stringify(bag));
    localStorage.setItem('selected', JSON.stringify(selectBook));
  }, [selectBook, books]);

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

  const filtroPorTitulo = ({ target }) => {
    const lista = [...books].filter(({ title }) =>
      matchByText(title, target.value),
    );
    setBookFilter(lista);
  };

  useEffect(() => {
    getList();
  }, [bookEdited, bookDeleted]);

  const addBookToList = useCallback(
    (book) => {
      const list = [...books, book];
      setBooks(list);
    },
    [books],
  );

  useEffect(() => {
    setSelected();
  }, [setSelected, selectBook]);

  useEffect(() => {
    if (bookCreated && !books.map(({ id }) => id).includes(bookCreated.id)) {
      addBookToList(bookCreated);
    }
    setBookFilter(books);
  }, [addBookToList, bookCreated, books]);

  return (
    <div className="book-list-wrapper">
      <input
        className="book-list-filter"
        placeholder="Search book for title"
        onChange={filtroPorTitulo}
      />
      <div className="book-list">
        {bookFilter.map((books, index) => (
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
    </div>
  );
}

export default BookList;
