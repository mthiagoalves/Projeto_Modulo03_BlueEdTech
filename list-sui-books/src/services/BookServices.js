import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();



export const BookServices = {
  getList: () => fetch(Api.booklist(), { method: "GET" }).then(parseResponse),
  getById: (id) =>
    fetch(Api.bookById(id), { method: "GET" }).then(parseResponse),
  createBook: () =>
    fetch(Api.createBook(), { method: "POST" }).then(parseResponse),
  updateBook: (id) =>
    fetch(Api.updateBook(id), { method: "PUT" }).then(parseResponse),
  deleteBook: (id) =>
    fetch(Api.deleteBook(id), { method: "DELETE" }).then(parseResponse),
};
