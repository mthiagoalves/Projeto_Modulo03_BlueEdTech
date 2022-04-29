import "./BookListItem.css";

function BookListItem({
  book,
  qtdSelected,
  index,
  onRemove,
  onAdd,
  clickItem,
}) {
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="book-list-item-badge">{qtdSelected}</span>
    );

  const btnRemove = (canRender, index) =>
    Boolean(canRender) && (
      <button
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
  return (
    <div className="book-list-item" onClick={() => clickItem(book.id)}>
      {badgeCounter(qtdSelected, index)}
      <div className="book-container">
        <div className="book-title">{book.title}</div>
        <div className="book-price">$ {book.price}</div>
        <div className="book-author">{book.author}</div>
        <div className="btn-actions action">
          <button
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
