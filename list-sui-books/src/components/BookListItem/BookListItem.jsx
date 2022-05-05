import "./BookListItem.css";
import { ActionMode } from "constants/index";

function BookListItem({
  book,
  qtdSelected,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="book-list-item-badge">{qtdSelected}</span>
    );

  const btnRemove = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="add-remove"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        {" "}
        Remove to cart{" "}
      </button>
    );

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`book-list-item-tag ${
            mode === ActionMode.DELET && "book-list-item-tag-delete"
          }`}
        >
          {mode}
        </span>
      );
  };

  return (
    <div
      className={`book-list-item ${
        mode !== ActionMode.NORMAL && "book-list-item-disable"
      } ${mode === ActionMode.DELET && "book-list-item-delete"}`}
      onClick={() => clickItem(book.id)}
    >
      {badgeCounter(qtdSelected, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div className="book-container">
        <div className="book-title">{book.title}</div>
        <div className="book-price">$ {book.price}</div>
        <div className="book-author">{book.author}</div>
        <div className="btn-actions action">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`add-cart ${!qtdSelected && "add-cart-pre"}`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            Add to cart
          </button>
          {btnRemove(qtdSelected, index)}
        </div>
      </div>
      <img src={book.img} alt={`Book: ${book.title}`} className="book-img" />
    </div>
  );
}

export default BookListItem;
