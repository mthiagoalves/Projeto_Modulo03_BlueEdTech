import BookList from "components/BooksList/BookList";
import { useState } from "react";
import AddBooksModal from "components/AddBooksModal/AddBooksModal";
import "./Home.css";
import NavBar from "components/Navbar/NavBar";

function Home() {
  const [canShowBookModal, setCanShowBookModal] = useState(false);

  const [bookToAdd, setBookToAdd] = useState();
  return (
    <div className="Home">
      <NavBar createBook={() => setCanShowBookModal(true)} />
      <div className="home-container">
        <BookList bookCreated={bookToAdd}/>
        {canShowBookModal && (
          <AddBooksModal
            closeModal={() => setCanShowBookModal(false)}
            onCreateBook={(book) => setBookToAdd(book)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
