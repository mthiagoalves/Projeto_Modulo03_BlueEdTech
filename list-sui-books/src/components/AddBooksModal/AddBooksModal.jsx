import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AddBooksModal.css";
import { BookServices } from "services/BookServices";

function AddBooksModal({ closeModal }) {
  const form = {
    title: "",
    price: "",
    author: "",
    year: "",
    genre: "",
    description: "",
    img: "",
    continue: true,
  };

  const [state, SetState] = useState(form);

  const handleChange = (event, name) => {
    SetState({ ...state, [name]: event.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendBtn = () => {
    const response = !Boolean(
      state.description.length &&
        state.img.length &&
        state.title.length &&
        state.price.length &&
        state.author.length &&
        state.year.length &&
        state.genre.length
    );
    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendBtn();
  });

  const bookCreate = async () => {
    const renameimg = (imgPath) => imgPath.split("\\").pop();

    const { title, price, author, year, genre, description, img } = state;

    const books = {
      title,
      description,
      price,
      year,
      genre,
      author,
      img: `assets/images/${renameimg(img)}`,
      continue: true,
    };
    console.log(books);
    const response = await BookServices.createBook(books);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="add-book-modal">
        <form autoComplete="off">
          <h2>Add books to library</h2>
          <div>
            <label htmlFor="title" className="add-book-modal-text">
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Book title"
              value={state.title}
              onChange={(event) => handleChange(event, "title")}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="add-book-modal-text">
              Price:
            </label>
            <input
              type="price"
              id="title"
              placeholder="Price"
              value={state.price}
              onChange={(event) => handleChange(event, "price")}
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="add-book-modal-text">
              Author:
            </label>
            <input
              type="text"
              id="author"
              placeholder="Author"
              value={state.author}
              onChange={(event) => handleChange(event, "author")}
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="add-book-modal-text">
              Year:
            </label>
            <input
              type="text"
              id="year"
              placeholder="Year book"
              value={state.year}
              onChange={(event) => handleChange(event, "year")}
              required
            />
          </div>
          <div>
            <label htmlFor="genre" className="add-book-modal-text">
              Genre:
            </label>
            <input
              type="text"
              id="genre"
              placeholder="Genre"
              value={state.genre}
              onChange={(event) => handleChange(event, "genre")}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="add-book-modal-text">
              Description:
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={state.description}
              onChange={(event) => handleChange(event, "description")}
              required
            />
          </div>
          <div>
            <label
              htmlFor="img"
              className="add-book-modal-text add-book-modal-img-label"
            >
              {!state.img.length ? "Select Book Cover" : state.img}
            </label>

            <input
              className="add-book-modal-img"
              type="file"
              accept="image/png, image/gif, image/jpg, image/jpeg"
              id="img"
              placeholder="Book cover"
              value={state.img}
              onChange={(event) => handleChange(event, "img")}
              required
            />
          </div>
          <button
            className="btn-add-book"
            type="button"
            disabled={canDisable}
            onClick={bookCreate}
          >
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddBooksModal;
