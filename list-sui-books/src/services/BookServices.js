import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformBook = (book) => {
  const title = book.continue;

  return {
    ...book,
    id: book._id,
    titulo: book.title,
    price: book.price,
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
  createBook: () =>
    fetch(Api.createBook(), { method: "POST" }).then(parseResponse),
  updateBook: (id) =>
    fetch(Api.updateBook(id), { method: "PUT" }).then(parseResponse),
  deleteBook: (id) =>
    fetch(Api.deleteBook(id), { method: "DELETE" }).then(parseResponse),
};
