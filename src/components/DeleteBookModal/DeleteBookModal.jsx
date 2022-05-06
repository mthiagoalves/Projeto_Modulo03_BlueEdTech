import { BookServices } from "services/BookServices";
import "./DeleteBookModal.css";
import Modal from "components/Modal/Modal";

function DeleteBookModal({ closeModal, bookForDelete, onDeleteBook }) {
  const handleDelete = async (books) => {
    await BookServices.deleteBook(books.id);
    onDeleteBook(books);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="delete-book-modal">
        <h2>Confirm</h2>
        <p>
          Are you sure delete <b>{bookForDelete.title}</b> to library?
        </p>

        <img
          className="delete-book-modal-img"
          src={bookForDelete.img}
          alt={bookForDelete.title}
        />

        <br />

        <div>
          <button
            onClick={() => handleDelete(bookForDelete)}
            className="delete-book-modal-confirm"
          >
            {" "}
            Confirm{" "}
          </button>
          <button onClick={closeModal} className="delete-book-modal-cancel">
            {" "}
            Cancel{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBookModal;
