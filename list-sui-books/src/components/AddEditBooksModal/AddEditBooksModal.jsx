import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AddEditBooksModal.css";
import { BookServices } from "services/BookServices";
import { ActionMode } from "constants/index";

function AddEditBooksModal({
  closeModal,
  onCreateBook,
  mode,
  bookForEdit,
  onUpdateBook,
}) {
  const form = {
    title: bookForEdit?.title ?? "",
    price: bookForEdit?.price ?? "",
    author: bookForEdit?.author ?? "",
    year: bookForEdit?.year ?? "",
    genre: bookForEdit?.genre ?? "",
    description: bookForEdit?.description ?? "",
    img: bookForEdit?.img ?? "",
    continue: true,
  };

  const [state, SetState] = useState(form);

  console.log(form);

  const handleChange = (event, name) => {
    SetState({ ...state, [name]: event.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendBtn = () => {
    const response = !Boolean(
      state.description.length &&
        state.img.length &&
        state.title.length &&
        String(state.price).length &&
        state.author.length &&
        String(state.year).length &&
        state.genre.length
    );
    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendBtn();
  });

  const handleSend = async () => {
    const renameImg = (imgPath) => imgPath.split(/\\|\//).pop();

    const { title, price, author, year, genre, description, img } = state;

    const books = {
      ...(bookForEdit && { _id: bookForEdit?.id }),
      title,
      description,
      price,
      year,
      genre,
      author,
      img: `assets/img/${renameImg(img)}`,
      continue: true,
    };
    console.log(books);

    const serviceCall = {
      [ActionMode.NORMAL]: () => BookServices.createBook(books),
      [ActionMode.UPDATE]: () =>
        BookServices.updateBook(bookForEdit?.id, books),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateBook(response),
      [ActionMode.UPDATE]: () => onUpdateBook(response),
    };

    actionResponse[mode]();

    const resetInput = {
      title: "",
      description: "",
      price: "",
      year: "",
      genre: "",
      author: "",
      img: "",
      continue: true,
    };

    SetState(resetInput);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="add-book-modal">
        <form autoComplete="off">
          <h2>
            {" "}
            {ActionMode.UPDATE === mode ? "Update" : "Add"} book to library
          </h2>
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
              onChange={(event) => handleChange(event, "img")}
              required
            />
          </div>
          <button
            className="btn-add-book"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Register" : "Update"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddEditBooksModal;
