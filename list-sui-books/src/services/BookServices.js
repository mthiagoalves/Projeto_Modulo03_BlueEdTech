import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformBook = (book) => {
  const title = book.continue;

  return {
    ...book,
    id: book._id,
    title: book.title,
    description: book.description,
    price: book.price,
    year: book.year,
    genre: book.genre,
    author: book.author,
    img: book.img,
    continue: Boolean(title),
  };
};



const parseTransformList = (response) =>
  parseResponse(response).then((books) => books.map(transformBook));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformBook);

export const BookServices = {
  getList: () =>
    fetch(Api.booklist(), { method: "GET" }).then(parseTransformList),
  getById: (id) =>
    fetch(Api.bookById(id), { method: "GET" }).then(parseTransformItem),
  createBook: (books) =>
    fetch(Api.createBook(), {
      method: "POST",
      body: JSON.stringify(books),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseTransformItem),
  updateBook: (id, book) =>
    fetch(Api.updateBook(id), {
      method: "PUT",
      body: JSON.stringify(book),
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    }).then(parseResponse),
  deleteBook: (id) =>
    fetch(Api.deleteBook(id), { method: "DELETE" }).then(parseResponse),
};
