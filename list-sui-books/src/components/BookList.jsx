import "./BookList.css";

function BookList() {
  return (
    <div className="book-list">
      <div className="book-list-item">
        <div className="book-title">The left hand of god</div>
        <div className="book-genre">Fiction</div>
        <div className="book-author">Author</div>
        <div className="btn-actions action">
          <button className="add-cart add-pre">Add to cart</button>
        </div>
      </div>
      <img
        src={require("../assets/img/the-left-hand-of-god.jpg")}
        alt="book"
        className="book-img"
      />
    </div>
  );
}

export default BookList;
