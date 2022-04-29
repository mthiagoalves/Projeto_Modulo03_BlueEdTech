import "./details.css";
import Modal from "components/modal/modal";

function BooksDetails({ books, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="book-details">
        <div>
          <div className="book-title-modal">{books.title}</div>
          <div className="book-price-modal">$ {Number(books.price).toFixed(2)}</div>
          <div className="book-author-modal"><b>{books.author}</b></div>
          <div className="book-descripton-modal"><b>Genre:</b> {books.genre}</div>
          <div className="book-descripton-modal"><b>Descr.: </b>{books.description}</div>
        </div>
        <img src={books.img} alt={`Book: ${books.title}`} className="book-image-modal" />
      </div>
    </Modal>
  );
}

export default BooksDetails;
