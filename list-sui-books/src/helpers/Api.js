const BookContext = {
  bookEndpoint: () => `${Api.baseUrl}/books`,
  booklist: () => `${BookContext.bookEndpoint()}/find-book`,
  bookById: (id) => `${BookContext.bookEndpoint()}/book/${id}`,
  createBook: () => `${BookContext.bookEndpoint()}/create`,
  updateBook: (id) => `${BookContext.bookEndpoint()}/update/${id}`,
  deleteBook: (id) => `${BookContext.bookEndpoint()}/delete/${id}`,
};

const bagContext = {
  getBag: () => `${BookContext.bookEndpoint()}/all-cart`,
  createBag: () => `${BookContext.bookEndpoint()}/create-cart`,
  purchase: () => `${BookContext.bookEndpoint()}/finish-cart`,
};

export const Api = {
  baseUrl: 'https://api-shelves-books.onrender.com',
  ...BookContext,
  ...bagContext,
};
